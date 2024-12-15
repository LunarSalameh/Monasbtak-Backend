<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require ' /php/vendor/autoload.php';

function sendEmail($toEmail, $status) {
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
        $mail->Subject = "Planner Status Update";
        $mail->Body    = "Your planner status has been updated to: <b>$status</b>";

        if ($mail->send()) {
            return ['success' => true, 'message' => 'Email sent'];
        } else {
            return ['success' => false, 'message' => 'Email not sent'];
        }
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

// Get planner's email from the database (example function)
function getPlannerEmail($plannerId) {
    global $pdo;

    $stmt = $pdo->prepare("SELECT email FROM planners WHERE id = :id");
    $stmt->bindParam(':id', $plannerId);
    $stmt->execute();
    $planner = $stmt->fetch(PDO::FETCH_ASSOC);

    return $planner['email'];// Return email if found, or null
}
?>