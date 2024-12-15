<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(__DIR__ . '/../php/config/dbh.inc.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the file was uploaded
    if (isset($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
        // Get the image binary data
        $imageData = file_get_contents($_FILES['image']['tmp_name']);
    } else {
        echo json_encode(['message' => 'Image file is required']);
        exit;
    }

    // Get the POST data
    $data = $_POST;

    if (
        isset($data['name'], $data['description'], $data['location'], $data['subCategory_ids'])
    ) {
        try {

            // Prepare the SQL statement for venues table
            $stmt = $pdo->prepare('INSERT INTO venues (name, description, image, location) 
                                   VALUES (:name, :description, :image, :location)');

            // Bind the parameters
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB);
            $stmt->bindParam(':location', $data['location']);

            // Execute the query
            if ($stmt->execute()) {
                // Get the last inserted venue_id
                $venue_id = $pdo->lastInsertId();

                // Insert into venue_subcategory table
                $subCategoryIds = explode(',', $data['subCategory_ids']);
                foreach ($subCategoryIds as $subCategoryId) {
                    $stmt2 = $pdo->prepare('INSERT INTO venue_subcategory (venue_id, subCategory_id) VALUES (:venue_id, :subCategory_id)');
                    $stmt2->bindParam(':venue_id', $venue_id);
                    $stmt2->bindParam(':subCategory_id', $subCategoryId);
                    $stmt2->execute();
                }
                echo json_encode(['message' => 'Venue and venue subcategories created successfully']);
            } else {
                echo json_encode(['message' => 'Failed to create venue']);
            }
        } catch (Exception $e) {
            echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['message' => 'Invalid input data']);
    }
} else {
    echo json_encode(['message' => 'Method not allowed']);
}
