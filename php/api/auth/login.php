<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');
require_once '/opt/lampp/htdocs/Monasbtak-Backend/php/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "1324qwer";


// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['usernameOrPhone']) && isset($data['pwd'])) {
    $usernameOrPhone = $data['usernameOrPhone'];
    $password = $data['pwd'];

    try {
        
        // check both tables 
        $stmt = $pdo->prepare("(
            SELECT 'customer' AS accountType, id, username, phonenumber, pwd, gender, account_type, NULL as action, IsDeleted FROM users WHERE username = :usernameOrPhone OR phonenumber = :usernameOrPhone
        )
        UNION
        (
            SELECT 'planner' AS accountType, id, username, phonenumber, pwd, gender, account_type , action, IsDeleted FROM planners WHERE username = :usernameOrPhone OR phonenumber = :usernameOrPhone
        )");

        $stmt->bindParam(':usernameOrPhone', $usernameOrPhone);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);


        if ($user) {

            $user['accountType'] = $user['accountType'] ?? NULL;
            
            if ($user['accountType'] === 'planner' && $user['action'] !== 'Accepted' ) {
                if ($user['action'] === 'Rejected' ){
                    echo json_encode(['success' => false, 'message' => 'Your Account has been REJECTED please contact us at MonasbtakTeam@gmail.com']);
                }
                else if ($user['action'] === 'Pending'){
                    echo json_encode(['success' => false, 'message' => 'Your account has not been approved yet.']);
                }

                exit;
            }
            else if ($user['IsDeleted'] == true ){
                echo json_encode(['success' => false, 'message' => 'Your Account is deactivated please contact us at MonasbtakTeam@gmail.com']);
                exit;

            }


            // Verify the password
            if (password_verify($password, $user['pwd'])) {
                unset($user['pwd']);

                 // Generate JWT payload
                $payload = [
                    "iat" => time(),
                    "exp" => time() + 3600, 
                    "userId" => $user['id'],
                    "username" => $user['username'],
                    "accountType" => $user['accountType']
                ];
                
                $jwt = JWT::encode($payload, $secret_key, 'HS256');


                echo json_encode([
                'success' => true,
                'message' => 'Sign-in successful',
                'token' => $jwt,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'accountType' => $user['accountType']
                ]
            ]);
            
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}

?>