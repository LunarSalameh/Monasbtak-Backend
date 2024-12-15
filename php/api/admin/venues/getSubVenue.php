<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('/monasbtak.org/php/config/dbh.inc.php');

try {
    // Validate and sanitize the venue_id from query parameters
    $venue_id = isset($_GET['venue_id']) ? filter_var($_GET['venue_id'], FILTER_VALIDATE_INT) : null;

    if ($venue_id) {
        // Prepare the SQL query to fetch username and image based on venue_id
        $sql = "SELECT subCategory_id FROM venue_subcategory WHERE venue_id = :venue_id "; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':venue_id', $venue_id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the subCategory data
        $subCategory = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($subCategory) {
            // Return the subCategory data as JSON
            echo json_encode(['status' => 'success', 'data' => $subCategory]);
        } else {
            // No subCategory found
            echo json_encode(['status' => 'error', 'message' => 'No subCategory found for the given venue_id']);
        }
    } else {
        // Invalid or missing venue_id
        echo json_encode(['status' => 'error', 'message' => 'Invalid venue_id']);
    }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
