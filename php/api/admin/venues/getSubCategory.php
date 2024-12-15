<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    // Validate and sanitize the id from query parameters
    $id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    if ($id) {
        // Prepare the SQL query to fetch username and image based on id
        $sql = "SELECT name, category_id FROM sub_categories WHERE id = :id "; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the subCategory data
        $subCategory = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($subCategory) {
            // Return the subCategory data as JSON
            echo json_encode(['status' => 'success', 'data' => $subCategory]);
        } else {
            // No subCategory found
            echo json_encode(['status' => 'error', 'message' => 'No subCategory found for the given id']);
        }
    } else {
        // Invalid or missing id
        echo json_encode(['status' => 'error', 'message' => 'Invalid id']);
    }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
