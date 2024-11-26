<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Database connection parameters
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "MonTest";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Get user ID from query parameters
$user_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($user_id > 0) {
    // Fetch user data based on user ID
    $sql = "SELECT username, email, phonenumber, age, image, location, gender FROM users WHERE id = $user_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Convert image to base64
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

$conn->close();
?>
