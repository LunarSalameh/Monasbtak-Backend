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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the file was uploaded
    if (isset($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
        // Get the image binary data
        $imageData = file_get_contents($_FILES['image']['tmp_name']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Image file is required']);
        exit;
    }

    // Get the POST data
    $data = $_POST;
    {
        try {
            $stmt = $pdo->prepare('INSERT INTO slider (image) VALUES (:image)');

            // Bind the parameters
            $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB);

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'image added successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to add image']);
            }
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
