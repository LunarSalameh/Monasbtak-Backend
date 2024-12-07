<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

include('/opt/lampp/htdocs/Monasbtak-Backend/php/api/planner/profile/emailChangedPassword.php');

try{
    $input = json_decode(file_get_contents('php://input'), true);

    $id = $input['id'] ;
    $oldPwd = $input['oldPwd'] ;
    $newPwd = $input['newPwd'] ;
    $retypeNewPwd = $input['retypeNewPwd'];


    if ($id && $oldPwd && $newPwd && $retypeNewPwd){
        $sql = "SELECT email,username,pwd FROM planners WHERE id=:id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result && password_verify($oldPwd, $result['pwd'])){

            if ($newPwd === $retypeNewPwd){

                 // Validate password
                $passwordPattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/';
                if (!preg_match($passwordPattern, $newPwd)) {
                    echo json_encode(['message' => 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character']);
                    exit;
                }
                $newPwdHash = password_hash($newPwd, PASSWORD_DEFAULT);

                $sql = "UPDATE planners SET pwd=:newPwd WHERE id=:id";
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':newPwd', $newPwdHash);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                

                if ($stmt->execute()) {
                    $emailResponse = sendEmail($result['email'], $result['username']); 
                    echo json_encode(['success' => 'Password Changed Successfully','emailStatus' => $emailResponse]);
                } else {
                    echo json_encode(['error' => 'Failed to change password']);
                }

                
            }else{

                echo json_encode(['success' => false, 'message' => 'New Passwords do not match']);
            }

        }else{
            echo json_encode(['success' => false, 'message' => 'Incorrect Current Password']);
        }

    }else{
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }

}catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>