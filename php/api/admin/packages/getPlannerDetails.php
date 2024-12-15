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
$pdo = require_once(__DIR__ . '/../php/config/dbh.inc.php');
try {
    // Validate and sanitize the id from query parameters
    $id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    if ($id) {
        // Prepare the SQL query to fetch username and image based on id
        $sql = "SELECT username, image FROM planners WHERE id = :id AND IsDeleted = 0"; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the planner data
        $planner = $stmt->fetch(PDO::FETCH_ASSOC);

        // Base64 encode the image data
        if ($planner && isset($planner['image'])) {
            $planner['image'] = base64_encode($planner['image']);
        }

        if ($planner) {
            // Return the planner data as JSON
            echo json_encode(['status' => 'success', 'data' => $planner]);
        } else {
            // No planner found
            echo json_encode(['status' => 'error', 'message' => 'No planner found for the given id']);
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
