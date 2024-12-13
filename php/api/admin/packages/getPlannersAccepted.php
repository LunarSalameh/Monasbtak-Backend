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
$pdo = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

try {
        // Prepare the SQL query to fetch all planners with action 'Accepted'
        $sql = "SELECT id, username, image FROM planners WHERE action = 'Accepted' AND IsDeleted = 0"; 
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        // Fetch the planner data
        $planner = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Base64 encode the image data
        foreach ($planner as &$package) {
            if (isset($package['image'])) {
                $package['image'] = base64_encode($package['image']);
            }
        }

        if ($planner) {
            // Return the planner as JSON
            echo json_encode(['status' => 'success', 'data' => $planner]);
        } else {
            // No planner found
            echo json_encode(['status' => 'error', 'message' => 'No planner found']);
        }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
