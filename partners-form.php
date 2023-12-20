<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'your_smtp_server'; // Set the SMTP server to send through
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your_smtp_username'; // SMTP username
    $mail->Password   = 'your_smtp_password'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Validate and sanitize input
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $companyName = filter_input(INPUT_POST, 'companyName', FILTER_SANITIZE_STRING);
    $source = filter_input(INPUT_POST, 'source', FILTER_SANITIZE_STRING);
    $interest = filter_input(INPUT_POST, 'interest', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telephone = filter_input(INPUT_POST, 'telephone', FILTER_SANITIZE_STRING);
    $additionalInfo = filter_input(INPUT_POST, 'additionalInfo', FILTER_SANITIZE_STRING);
    $agreement = filter_input(INPUT_POST, 'agreement', FILTER_SANITIZE_STRING);

    // Check required fields
    if (!$name || !$companyName || !$email) {
        throw new Exception('Required fields are missing.');
    }

    // Recipients
    $mail->setFrom('info@yourdomain.com', 'Mailer');
    $mail->addAddress('info@cyrcl.eu', 'Cyrcl Team'); // Add a recipient

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'New Partner Inquiry';
    $mail->Body    = "Name: $name<br>Company: $companyName<br>Source: $source<br>Interest: $interest<br>Email: $email<br>Phone: $telephone<br>Additional Info: $additionalInfo<br>Agreement: $agreement";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
