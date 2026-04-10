<?php
// Configuration
$recipient = 'info@bezkompresemedia.cz';
$subject = 'Nová poptávka z bezkompresemedia.cz';
$hcaptcha_secret = 'HCAPTCHA_SECRET_KEY'; // Replace with actual secret

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

// Honeypot check
if (!empty($_POST['url'])) {
    // Bot detected — silently redirect
    header('Location: /contact/?sent=1');
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

// Anti-header-injection
$headers = [];
$headers[] = 'From: ' . $jmeno . ' <' . $email . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Build email body
$body = "Nová poptávka z bezkompresemedia.cz\n";
$body .= "================================\n\n";
$body .= "Jméno: " . $jmeno . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Telefon: " . ($telefon ?: 'neuvedeno') . "\n\n";
$body .= "Poptávka:\n" . $poptavka . "\n";

// Send email
$mail_sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

if (!$mail_sent) {
    http_response_code(500);
    echo 'Omlouváme se, zprávu se nepodařilo odeslat. Zkuste to prosím později.';
    exit;
}

// Record submission for rate limiting
$_SESSION['form_submissions'][] = time();

// Redirect to thank you
header('Location: /contact/?sent=1');
exit;
?>
