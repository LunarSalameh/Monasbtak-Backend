<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '/php/vendor/autoload.php';

function sendEmail($toEmail,$username, $pwd) {
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
        $mail->Subject = "Welcome To Monasbtak!";
        $mail->Body    = "You have been Added to our Planners Team:
                            <div>this is your username: <b>$username</b>
                            <div>your password: <b>$pwd</b></div>
                            <div>Go to your profile from <a href='http://localhost:3000/planners/profile' classname='font-extrabold underline'>HERE</a> and change your password!</div></div>";

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