<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection

$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');
require_once '/php/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "1324qwer";

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['username']) && isset($data['pwd'])) {
    $username = $data['username'];
    $password = $data['pwd'];

    try {
        // Query to find the user
        $stmt = $pdo->prepare("SELECT * FROM admin WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin) {
            // Verify the password
            if (password_verify($password, $admin['pwd'])) {
                // Generate JWT payload
                $payload = [
                    "iat" => time(),
                    "exp" => time() + 3600, 
                    "userId" => $admin['id'],
                    "username" => $admin['username'],
                    "accountType" => $admin['accountType']
                ];

                $jwt = JWT::encode($payload, $secret_key, 'HS256');


                echo json_encode([
                'success' => true,
                'message' => 'Sign-in successful',
                'token' => $jwt,
                'user' => [
                    'id' => $admin['id'],
                    'username' => $admin['username'],
                    'accountType' => $admin['accountType']
                ] 
            ]);

            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'admin not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>