<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    // Validate and sanitize the venue_id from query parameters
    $venue_id = isset($_GET['venue_id']) ? filter_var($_GET['venue_id'], FILTER_VALIDATE_INT) : null;

    if ($venue_id) {
        // Prepare the SQL query to fetch all subCategory_ids and their names based on venue_id
        $sql = "SELECT sc.id as subCategory_id, sc.name as subCategory_name, c.name as category_name 
                FROM venue_subcategory vs
                JOIN sub_categories sc ON vs.subCategory_id = sc.id
                JOIN categories c ON sc.category_id = c.id
                WHERE vs.venue_id = :venue_id";
                
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':venue_id', $venue_id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the details
        $details = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($details) {
            // Return the details as JSON
            echo json_encode(['status' => 'success', 'data' => $details]);
        } else {
            // No details found
            echo json_encode(['status' => 'error', 'message' => 'No details found for the given venue_id']);
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
