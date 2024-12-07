<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '/opt/lampp/htdocs/Monasbtak-Backend/php/vendor/autoload.php';

function sendEmail($toEmail,$username) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';   
        $mail->SMTPAuth = true;
        $mail->Username = 'monasbtakteam@gmail.com';   
        $mail->Password = 'xwshrgykclrejien';   
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Sender's info
        $mail->setFrom('monasbtakTEAM@gmail.com', 'Monasbtak Team');
        $mail->addAddress($toEmail);

        // Email subject and body
        $mail->isHTML(true);
        $mail->Subject = "Changed Password!";
        $mail->Body    = "Hello Planner <b>$username</b>:
                            <div>Your Password Changed Successfully</div>";

        if ($mail->send()) {
            return ['success' => true, 'message' => 'Email sent'];
        } else {
            return ['success' => false, 'message' => 'Email not sent'];
        }
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>