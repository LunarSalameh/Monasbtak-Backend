<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Use wildcard for development
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(__DIR__ . '/../php/config/dbh.inc.php');
$defaultImagePath = ' /client/public/profileimage.jpg';
$defaultImageBase64 = file_exists($defaultImagePath) ? base64_encode(file_get_contents($defaultImagePath)) : null;

try {
    // Prepare the SQL query to fetch all planners with action 'Accepted'
    $sql = "SELECT id, username, image FROM planners WHERE action = 'Accepted' AND IsDeleted = 0"; 
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch the planner data
    $planners = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($planners)) {
        // Base64 encode the image data
        foreach ($planners as &$planner) {
            if (isset($planner['image'])) {
                $planner['image'] = base64_encode($planner['image']);
            } elseif ($defaultImageBase64 !== null) {
                $planner['image'] = $defaultImageBase64; // Use default image if available
            } else {
                $planner['image'] = null; // Fallback if no default image
            }
        }

        // Return the planner as JSON
        echo json_encode(['status' => 'success', 'data' => $planners]);
    } else {
        // No planner found
        echo json_encode(['status' => 'error', 'message' => 'No planners found']);
    }
} catch (PDOException $e) {
    // Handle database connection or query errors
    error_log('Database error: ' . $e->getMessage()); // Log the error
    echo json_encode(['status' => 'error', 'message' => 'An error occurred while processing your request']);
}

?>
