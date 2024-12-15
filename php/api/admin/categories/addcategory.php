<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

// Handle category addition
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
        // Get the image binary data
        $imageData = file_get_contents($_FILES['image']['tmp_name']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Image file is required']);
        exit;
    }

    $data = $_POST;

    if (
        isset($data['name'])
    )
    {
        try{
            $stmt = $pdo->prepare('INSERT INTO categories (name, image) VALUES (:name, :image)');
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Category created successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to create category']);
            }
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Failed to create category']);

        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
