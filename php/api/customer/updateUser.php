<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(' /php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phonenumber = trim($_POST['phonenumber'] ?? '');
    $age = trim($_POST['age'] ?? '');
    $location = trim($_POST['location'] ?? '');
    $gender = trim($_POST['gender'] ?? '');
    $image = $_FILES['image'] ?? null;

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = file_get_contents($_FILES['image']['tmp_name']);
    }

    // Debugging: Log received data
    // error_log(print_r($_POST, true));
    // error_log(print_r($_FILES, true));


    // Debugging: Log the query and parameters
    // error_log('SQL Query: ' . $query);
    // error_log('Parameters: ' . print_r([$username, $email, $phonenumber, $age, $location, $gender, $image, $id], true));

    try {
        $query = "UPDATE users SET username = :username, email = :email, phonenumber = :phonenumber, age = :age, location = :location, gender = :gender, image = :image WHERE id = :id";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phonenumber', $phonenumber);
        $stmt->bindParam(':age', $age);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':image', $image, PDO::PARAM_LOB);

        if ($stmt->execute()) {
            $query = "SELECT * FROM users WHERE id = :id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $updatedUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($updatedUser) {
                $updatedUser['image'] = base64_encode($updatedUser['image']);
                echo json_encode(['success' => true, 'message' => 'User updated successfully.', 'user' => $updatedUser]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to fetch updated user.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update user (execute).']);
        }
    } catch (Exception $e) {
        error_log('SQL Error: ' . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Failed to update user: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>