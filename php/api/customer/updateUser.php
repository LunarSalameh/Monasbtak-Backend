<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phonenumber = trim($_POST['phonenumber'] ?? '');
    $age = trim($_POST['age'] ?? '');
    $location = trim($_POST['location'] ?? '');
    $gender = trim($_POST['gender'] ?? '');
    $image = null;

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = file_get_contents($_FILES['image']['tmp_name']);
    }

    // Debugging: Log received data
    error_log(print_r($_POST, true));
    error_log(print_r($_FILES, true));

    $query = "UPDATE users SET username = ?, email = ?, phonenumber = ?, age = ?, location = ?, gender = ?, image = ? WHERE id = ?";
    $stmt = $pdo->prepare($query);

    // Debugging: Log the query and parameters
    error_log('SQL Query: ' . $query);
    error_log('Parameters: ' . print_r([$username, $email, $phonenumber, $age, $location, $gender, $image, $id], true));

    try {
        $stmt->execute([$username, $email, $phonenumber, $age, $location, $gender, $image, $id]);
        $updatedUser = [
            'id' => $id,
            'username' => $username,
            'email' => $email,
            'phonenumber' => $phonenumber,
            'age' => $age,
            'location' => $location,
            'gender' => $gender,
            'image' => $image
        ];
        echo json_encode(['success' => true, 'message' => 'User updated successfully.', 'user' => $updatedUser]);
    } catch (Exception $e) {
        error_log('SQL Error: ' . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Failed to update user: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>