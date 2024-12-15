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
        echo json_encode(['message' => 'Image file is required']);
        exit;
    }

    // Get the POST data
    $data = $_POST;

    if (
        isset($data['name'], $data['description'], $data['price'],$data['planner_id'], $data['venue_id'],
         $data['category_id'], $data['subCat_name'], $data['location'], $data['planner_name'],$data['subCategory_id'], $data['venueDetails'])
    ) {
        try {
            // Set the status to 'pending'
            $status = 'Pending';
            $IsDeleted = 0 ;

            // Prepare the SQL statement
            $stmt = $pdo->prepare('INSERT INTO packeges (name, description, price, image, planner_id, venue_id, category_id, subCat_name, location, status, planner_name, subCategory_id, venueDetails) 
                                   VALUES (:name, :description, :price, :image, :planner_id, :venue_id, :category_id, :subCat_name , :location, :status, :planner_name, :subCategory_id, :venueDetails)');

            // Bind the parameters
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB);
            $stmt->bindParam(':planner_id', $data['planner_id']);
            $stmt->bindParam(':venue_id', $data['venue_id']);
            $stmt->bindParam(':category_id', $data['category_id']);
            $stmt->bindParam(':subCat_name', $data['subCat_name']);
            $stmt->bindParam(':location', $data['location']);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':planner_name', $data['planner_name']);
            $stmt->bindParam(':subCategory_id', $data['subCategory_id']);
            $stmt->bindParam(':venueDetails', $data['venueDetails']);

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Package created successfully']);
            } else {
                echo json_encode(['message' => 'Failed to create package']);
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
