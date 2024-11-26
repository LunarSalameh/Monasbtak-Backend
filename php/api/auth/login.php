<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('C:\xampp\htdocs\Monasbtak-Backend\php\config\dbh.inc.php');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['usernameOrPhone']) && isset($data['pwd'])) {
    $usernameOrPhone = $data['usernameOrPhone'];
    $password = $data['pwd'];

    try {
        // Query to find the user by username or phone number
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :usernameOrPhone OR phonenumber = :usernameOrPhone");
        $stmt->bindParam(':usernameOrPhone', $usernameOrPhone);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Verify the password
            if (password_verify($password, $user['pwd'])) {
                // Remove sensitive data before sending the response
                unset($user['pwd']);
                echo json_encode(['success' => true, 'message' => 'Sign-in successful', 'user' => $user]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>