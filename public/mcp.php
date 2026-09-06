<?php
declare(strict_types=1);

// ─────────────────────────────────────────────────────────────────────────────
// BezKomprese Media — MCP server (Model Context Protocol over Streamable HTTP)
// Endpoint: https://bezkompresemedia.cz/mcp (rewritten to mcp.php in .htaccess)
//
// Stateless JSON-RPC 2.0 server implementing the MCP methods needed by
// standard clients (Claude Desktop, IDEs, agent frameworks):
//   initialize · notifications/* (202) · ping · tools/list · tools/call
//
// Read-only tools load from mcp-data.json — generated at build time from the
// same src/data/*.ts modules that render the site (single source of truth).
// submit_inquiry reuses the contact-handler mail pipeline (domain-aligned
// From, Reply-To visitor, RFC 2047) with a file-based per-IP rate limit.
// ─────────────────────────────────────────────────────────────────────────────

const SUPPORTED_PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const LATEST_PROTOCOL_VERSION = '2025-06-18';
const SERVER_NAME = 'bezkomprese-media';
const SERVER_VERSION = '1.0.0';
const MAX_INQUIRIES_PER_HOUR = 3;

// ── Helpers ──────────────────────────────────────────────────────────────────

function send_json(array $payload, int $status = 200)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function rpc_result($id, array $result)
{
    send_json(['jsonrpc' => '2.0', 'id' => $id, 'result' => $result]);
}

function rpc_error($id, int $code, string $message, int $http_status = 200)
{
    send_json([
        'jsonrpc' => '2.0',
        'id' => $id,
        'error' => ['code' => $code, 'message' => $message],
    ], $http_status);
}

function tool_text(string $text): array
{
    return ['content' => [['type' => 'text', 'text' => $text]], 'isError' => false];
}

/** @return array<string, mixed>|null decoded site data, or null when missing/corrupt */
function load_site_data(): ?array
{
    static $data = null;
    if ($data === null) {
        $raw = @file_get_contents(__DIR__ . '/mcp-data.json');
        if ($raw === false) {
            return null;
        }
        $decoded = json_decode($raw, true);
        $data = is_array($decoded) ? $decoded : ($decoded === null && $raw !== 'null' ? null : []);
    }
    return $data;
}

function text_from_data(string $key, string $header): array
{
    $data = load_site_data();
    if ($data === null) {
        return ['content' => [['type' => 'text', 'text' => 'Data webu nejsou k dispozici.']], 'isError' => true];
    }
    $text = $header . "\n";
    if ($key === 'services') {
        foreach ($data['services'] as $service) {
            $text .= "\n## {$service['name']}\n{$service['description']}\nVíce: {$service['url']}\n";
        }
    } elseif ($key === 'pricing') {
        foreach ($data['pricing'] as $section) {
            $text .= "\n## {$section['section']}\n";
            foreach ($section['items'] as $item) {
                $text .= "- {$item['name']}: {$item['price']}";
                if (!empty($item['detail'])) {
                    $text .= " ({$item['detail']})";
                }
                $text .= "\n";
            }
            if (!empty($section['note'])) {
                $text .= "Pozn.: {$section['note']}\n";
            }
        }
    } elseif ($key === 'contact') {
        $c = $data['contact'];
        $text .= "\n{$c['address']}\nTelefon: {$c['phone']}\nE-mail: {$c['email']}\nOtevírací doba: "
            . implode(', ', $c['openingHours']) . "\nPoptávkový formulář: {$c['inquiryForm']}\n";
    } elseif ($key === 'faq') {
        foreach ($data['faq'] as $item) {
            $text .= "\n## {$item['question']}\n{$item['answer']}\n";
        }
    }
    return tool_text($text);
}

/** File-based per-IP rate limit for submit_inquiry (max N per hour). */
function inquiry_rate_limited(): bool
{
    $file = sys_get_temp_dir() . '/mcp-inq-' . hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown')) . '.json';
    $now = time();
    $times = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $times = array_values(array_filter($decoded, static fn($t) => is_int($t) && ($now - $t) < 3600));
        }
    }
    if (count($times) >= MAX_INQUIRIES_PER_HOUR) {
        return true;
    }
    $times[] = $now;
    // Failure to persist (read-only tmp) degrades to allow — validation still applies.
    @file_put_contents($file, json_encode($times));
    return false;
}

/**
 * @param array<string, mixed> $args
 * @return array{content: list<array{type: string, text: string}>, isError: bool}
 */
function submit_inquiry(array $args): array
{
    // Honeypot: agents told to leave it empty; bots fill it — silently "succeed".
    if (!empty($args['website'])) {
        return tool_text('Poptávka byla přijata. Ozveme se nejpozději do 24 hodin.');
    }

    $name = trim((string) ($args['name'] ?? ''));
    $email = trim((string) ($args['email'] ?? ''));
    $phone = trim((string) ($args['phone'] ?? ''));
    $service = trim((string) ($args['service'] ?? ''));
    $message = trim((string) ($args['message'] ?? ''));

    if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
        throw new InvalidArgumentException('Parametr "name" musí mít 2–100 znaků.');
    }
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        throw new InvalidArgumentException('Parametr "email" musí být platná e-mailová adresa.');
    }
    if (mb_strlen($phone) > 30) {
        throw new InvalidArgumentException('Parametr "phone" je příliš dlouhý (max 30 znaků).');
    }
    if (mb_strlen($message) < 10 || mb_strlen($message) > 2000) {
        throw new InvalidArgumentException('Parametr "message" musí mít 10–2000 znaků.');
    }
    $allowed_services = ['', 'foto', 'video', 'web', 'socialni-site', 'jine'];
    if (!in_array($service, $allowed_services, true)) {
        throw new InvalidArgumentException('Parametr "service" musí být jeden z: ' . implode(', ', array_slice($allowed_services, 1)) . ' (nebo prázdný).');
    }

    if (inquiry_rate_limited()) {
        return ['content' => [[
            'type' => 'text',
            'text' => 'Byl překročen limit odeslaných poptávek (3/hod). Zkuste to prosím později nebo zavolejte na +420 731 466 375.',
        ]], 'isError' => true];
    }

    // Mail pipeline identical to contact-handler.php (SPF/DMARC-aligned).
    $recipient = 'info@bezkompresemedia.cz';
    $subject = 'Nová poptávka z MCP serveru';
    $encode_header = static fn(string $text): string => '=?UTF-8?B?' . base64_encode($text) . '?=';

    $headers = [
        'From: BezKomprese Media <' . $recipient . '>',
        'Reply-To: ' . $email,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    $service_labels = [
        'foto' => 'Fotografické služby',
        'video' => 'Video produkce',
        'web' => 'Tvorba webových stránek',
        'socialni-site' => 'Správa sociálních sítí',
        'jine' => 'Jiné',
        '' => 'Neuvedeno',
    ];

    $body = "Nová poptávka z MCP serveru (bezkompresemedia.cz)\n";
    $body .= "================================\n\n";
    $body .= 'Jméno: ' . $name . "\n";
    $body .= 'Email: ' . $email . "\n";
    $body .= 'Telefon: ' . ($phone !== '' ? $phone : 'neuvedeno') . "\n";
    $body .= 'Služba: ' . ($service_labels[$service] ?? 'Neuvedeno') . "\n\n";
    $body .= "Poptávka:\n" . $message . "\n";

    // @ suppresses mail() warnings so they cannot corrupt the JSON-RPC response
    // in environments without a local MTA; failure is carried by the return value.
    $sent = @mail($recipient, $encode_header($subject), $body, implode("\r\n", $headers));
    if (!$sent) {
        return ['content' => [['type' => 'text', 'text' => 'Poptávku se nepodařilo odeslat. Zkuste to prosím později nebo napište na info@bezkompresemedia.cz.']], 'isError' => true];
    }

    return tool_text('Poptávka byla úspěšně odeslána. Ozveme se s nabídkou na míru, typicky do 24 hodin.');
}

/** @return list<array<string, mixed>> */
function tool_definitions(): array
{
    return [
        [
            'name' => 'get_services',
            'title' => 'Přehled služeb',
            'description' => 'Vrátí přehled všech služeb BezKomprese Media (web, foto, video, sociální sítě) včetně popisů a odkazů.',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
            'annotations' => ['readOnlyHint' => true],
        ],
        [
            'name' => 'get_pricing',
            'title' => 'Ceník služeb',
            'description' => 'Vrátí orientační ceník multimediálních služeb (svatby, portréty, sociální sítě, weby, hodinové sazby). Všechny ceny jsou smluvní.',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
            'annotations' => ['readOnlyHint' => true],
        ],
        [
            'name' => 'get_contact_info',
            'title' => 'Kontaktní údaje',
            'description' => 'Vrátí kontaktní údaje BezKomprese Media: telefon, e-mail, adresa v Klatovech, otevírací doba.',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
            'annotations' => ['readOnlyHint' => true],
        ],
        [
            'name' => 'get_faq',
            'title' => 'Časté dotazy',
            'description' => 'Vrátí časté dotazy a odpovědi (rozsah služeb, působnost, ceny, termíny dodání, objednávkový proces).',
            'inputSchema' => ['type' => 'object', 'properties' => new stdClass(), 'additionalProperties' => false],
            'annotations' => ['readOnlyHint' => true],
        ],
        [
            'name' => 'submit_inquiry',
            'title' => 'Odeslat poptávku',
            'description' => 'Odešle nezávaznou poptávku do BezKomprese Media (dorazí jako e-mail). Použij, když chce uživatel poptat služby. Parametr "website" vždy nech prázdný.',
            'inputSchema' => [
                'type' => 'object',
                'properties' => [
                    'name' => ['type' => 'string', 'description' => 'Jméno klienta (2–100 znaků)'],
                    'email' => ['type' => 'string', 'description' => 'E-mail klienta pro odpověď'],
                    'phone' => ['type' => 'string', 'description' => 'Telefon (volitelné)'],
                    'service' => ['type' => 'string', 'enum' => ['foto', 'video', 'web', 'socialni-site', 'jine'], 'description' => 'Poptávaná služba (volitelné)'],
                    'message' => ['type' => 'string', 'description' => 'Text poptávky (10–2000 znaků)'],
                    'website' => ['type' => 'string', 'description' => 'Nechat prázdné (honeypot).'],
                ],
                'required' => ['name', 'email', 'message'],
                'additionalProperties' => false,
            ],
            'annotations' => ['readOnlyHint' => false, 'destructiveHint' => false, 'idempotentHint' => false],
        ],
    ];
}

/** @param array<string, mixed> $request */
function dispatch(array $request)
{
    $id = array_key_exists('id', $request) ? $request['id'] : null;
    $method = (string) ($request['method'] ?? '');

    // Notifications (no id): acknowledge with 202 and empty body per Streamable HTTP.
    if ($id === null) {
        http_response_code(202);
        exit;
    }

    switch ($method) {
        case 'initialize':
            $requested = (string) ($request['params']['protocolVersion'] ?? '');
            $version = in_array($requested, SUPPORTED_PROTOCOL_VERSIONS, true) ? $requested : LATEST_PROTOCOL_VERSION;
            rpc_result($id, [
                'protocolVersion' => $version,
                'capabilities' => ['tools' => ['listChanged' => false]],
                'serverInfo' => ['name' => SERVER_NAME, 'version' => SERVER_VERSION],
                'instructions' => 'Server BezKomprese Media — multimediální agentura z Klatov (web, foto, video, sociální sítě). Read-only nástroje pro info o službách a cenách; submit_inquiry pro odeslání poptávky.',
            ]);
            // no break — rpc_result exits

        case 'ping':
            rpc_result($id, []);
            // no break

        case 'tools/list':
            rpc_result($id, ['tools' => tool_definitions()]);
            // no break

        case 'tools/call':
            $name = (string) ($request['params']['name'] ?? '');
            $args = $request['params']['arguments'] ?? [];
            if (!is_array($args)) {
                rpc_error($id, -32602, 'Neplatné argumenty nástroje.');
            }
            try {
                switch ($name) {
                    case 'get_services':
                        rpc_result($id, text_from_data('services', 'Služby BezKomprese Media:'));
                    case 'get_pricing':
                        rpc_result($id, text_from_data('pricing', 'Ceník BezKomprese Media (orientační, smluvní ceny; u kombinací množstevní slevy):'));
                    case 'get_contact_info':
                        rpc_result($id, text_from_data('contact', 'Kontakt BezKomprese Media:'));
                    case 'get_faq':
                        rpc_result($id, text_from_data('faq', 'Časté dotazy — BezKomprese Media:'));
                    case 'submit_inquiry':
                        rpc_result($id, submit_inquiry($args));
                    default:
                        rpc_error($id, -32602, "Neznámý nástroj \"{$name}\".");
                }
            } catch (InvalidArgumentException $e) {
                rpc_error($id, -32602, $e->getMessage());
            } catch (Throwable $e) {
                error_log('[mcp] tools/call failed: ' . $e->getMessage());
                rpc_result($id, ['content' => [['type' => 'text', 'text' => 'Interní chyba nástroje. Zkuste to prosím později.']], 'isError' => true]);
            }
            // no break

        default:
            rpc_error($id, -32601, "Neznámá metoda \"{$method}\".");
    }
}

// ── Transport (Streamable HTTP) ──────────────────────────────────────────────

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID');
header('Access-Control-Expose-Headers: MCP-Protocol-Version');
header('MCP-Protocol-Version: ' . LATEST_PROTOCOL_VERSION);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    // Stateless server: no long-lived SSE stream. The spec allows 405 here —
    // clients must use POST for JSON-RPC messages.
    header('Allow: POST, OPTIONS');
    send_json([
        'jsonrpc' => '2.0',
        'id' => null,
        'error' => ['code' => -32000, 'message' => 'This MCP server is stateless — POST JSON-RPC messages to this URL.'],
    ], 405);
}

if ($method !== 'POST') {
    http_response_code(405);
    header('Allow: POST, OPTIONS');
    exit;
}

$raw = file_get_contents('php://input');
$request = json_decode($raw ?: '', true);

if (!is_array($request) || ($request['jsonrpc'] ?? '') !== '2.0' || !isset($request['method']) || !is_string($request['method'])) {
    rpc_error(null, -32600, 'Neplatný JSON-RPC požadavek.');
}

dispatch($request);
