<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$conn = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

try {
    // Get user ID from query parameters
    $user_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($user_id > 0) {
        // Prepare and execute the query
        $sql = "SELECT username, email, phonenumber, age, image, location, gender FROM users WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Convert image to base64 if it exists
            if (!empty($user['image'])) {
                $user['image'] = 'data:image/jpeg;base64,' . base64_encode($user['image']);
            }

            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

// Close the connection
$conn = null;
?>
