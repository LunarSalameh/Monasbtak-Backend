<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('/php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get the POST data
    $data = json_decode(file_get_contents('php://input'), true);

    if (
        isset($data['venue_id'], $data['subCategory_id'])
    ) {
        try {
            // Insert into venue_subcategory table
            $stmt = $pdo->prepare('INSERT INTO venue_subcategory (venue_id, subCategory_id) VALUES (:venue_id, :subCategory_id)');
            $stmt->bindParam(':venue_id', $data['venue_id']);
            $stmt->bindParam(':subCategory_id', $data['subCategory_id']);
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Venue subcategory created successfully']);
            } else {
                echo json_encode(['message' => 'Failed to create venue subcategory']);
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
