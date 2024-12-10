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

try {
    // Validate and sanitize the user ID from query parameters
    $user_id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    if ($user_id) {
        // Prepare the SQL query
        $sql = "SELECT id, username, email, phonenumber, age, image, location, gender 
                FROM users 
                WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the user data
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // If user image exists, convert it to base64
            if (!empty($user['image'])) {
                $user['image'] =  base64_encode($user['image']);
            }

            // Return user data as JSON
            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            // User not found
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } else {
        // Invalid or missing user ID
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
