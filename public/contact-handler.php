<?php
// Configuration — secrets come from config.php (generated at deploy time by
// GitHub Actions from repository secrets, never committed) with getenv() as
// a fallback for environments that provide real env vars.
$config = file_exists(__DIR__ . '/config.php') ? include __DIR__ . '/config.php' : [];
$hcaptcha_secret = $config['hcaptcha_secret'] ?? getenv('HCAPTCHA_SECRET_KEY');
$recipient = $config['contact_recipient'] ?? 'info@bezkompresemedia.cz';
// Keep the domain out of the subject (spam heuristics flag URLs in subjects).
$subject = 'Nová poptávka z webového formuláře';

// Start session for rate limiting
session_start();

// Rate limiting: max 3 submissions per hour
$max_submissions = 3;
$time_window = 3600; // 1 hour

if (!isset($_SESSION['form_submissions'])) {
    $_SESSION['form_submissions'] = [];
}

// Clean old submissions
$_SESSION['form_submissions'] = array_filter($_SESSION['form_submissions'], function($time) use ($time_window) {
    return (time() - $time) < $time_window;
});

if (count($_SESSION['form_submissions']) >= $max_submissions) {
    http_response_code(429);
    echo 'Příliš mnoho odeslání. Zkuste to prosím později.';
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Metoda není povolena.';
    exit;
}

// CSRF: Verify Origin header matches expected domain
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = ['https://bezkompresemedia.cz', 'https://www.bezkompresemedia.cz'];
if ($origin && !in_array($origin, $allowed_origins)) {
    http_response_code(403);
    echo 'Neplatný zdroj požadavku.';
    exit;
}

// Honeypot check
if (!empty($_POST['url'])) {
    // Bot detected — silently redirect
    header('Location: /dekujeme/');
    exit;
}

// Required fields check
$required = ['jmeno', 'email', 'poptavka'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo 'Vyplňte prosím všechna povinná pole.';
        exit;
    }
}

// Sanitize inputs
$jmeno = htmlspecialchars(trim($_POST['jmeno']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$telefon = htmlspecialchars(trim($_POST['telefon'] ?? ''), ENT_QUOTES, 'UTF-8');
$poptavka = htmlspecialchars(trim($_POST['poptavka']), ENT_QUOTES, 'UTF-8');

if (!$email) {
    http_response_code(400);
    echo 'Zadejte prosím platný email.';
    exit;
}

// hCaptcha verification
if (empty($hcaptcha_secret)) {
    http_response_code(500);
    echo 'Formulář není správně nakonfigurován. Kontaktujte nás prosím emailem.';
    exit;
}

$hcaptcha_response = $_POST['h-captcha-response'] ?? '';
if (empty($hcaptcha_response)) {
    http_response_code(400);
    echo 'Prosím dokončete ověření hCaptcha.';
    exit;
}

$verify_url = 'https://api.hcaptcha.com/siteverify';
$verify_data = [
    'secret' => $hcaptcha_secret,
    'response' => $hcaptcha_response,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
];

$ch = curl_init($verify_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($verify_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$verify_result = curl_exec($ch);
curl_close($ch);

if ($verify_result === false) {
    http_response_code(500);
    echo 'Chyba ověření hCaptcha. Zkuste to prosím znovu.';
    exit;
}

$verify_json = json_decode($verify_result, true);
if (empty($verify_json['success'])) {
    http_response_code(400);
    echo 'Ověření hCaptcha selhalo. Zkuste to prosím znovu.';
    exit;
}

// Headers. The From address MUST be our own domain so the message aligns
// with SPF/DKIM/DMARC for bezkompresemedia.cz. Putting the visitor's address
// in From (as before) makes Gmail check gmail.com's DMARC policy against a
// WEDOS server → hard fail → spam. The visitor's address goes in Reply-To so
// "Reply" still reaches them. RFC 2047 encode any header with non-ASCII text.
$encode_header = static fn(string $text): string => '=?UTF-8?B?' . base64_encode($text) . '?=';

$headers = [];
$headers[] = 'From: BezKomprese Media <' . $recipient . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';

// Build email body
$body = "Nová poptávka z webu bezkompresemedia.cz\n";
$body .= "================================\n\n";
$body .= "Jméno: " . $jmeno . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Telefon: " . ($telefon ?: 'neuvedeno') . "\n\n";
$body .= "Poptávka:\n" . $poptavka . "\n";

// Send email (subject RFC 2047 encoded because it contains Czech characters)
$mail_sent = mail($recipient, $encode_header($subject), $body, implode("\r\n", $headers));

if (!$mail_sent) {
    http_response_code(500);
    echo 'Omlouváme se, zprávu se nepodařilo odeslat. Zkuste to prosím později.';
    exit;
}

// Record submission for rate limiting
$_SESSION['form_submissions'][] = time();

// Redirect to thank-you page
header('Location: /dekujeme/');
exit;
