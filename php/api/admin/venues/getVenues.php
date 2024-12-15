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
$pdo = require_once(__DIR__ . '/../../../php/config/dbh.inc.php');

try {
        // Prepare the SQL query to fetch all venues with status 'Accepted'
        $sql = "SELECT id, name, image, description, location FROM venues WHERE status = 'Accepted'"; 
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        // Fetch the venue data
        $venue = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Base64 encode the image data
        foreach ($venue as &$profile) {
            if (isset($profile['image'])) {
                $profile['image'] = base64_encode($profile['image']);
            }
        }

        if ($venue) {
            // Return the venue as JSON
            echo json_encode(['status' => 'success', 'data' => $venue]);
        } else {
            // No venue found
            echo json_encode(['status' => 'error', 'message' => 'No venue found']);
        }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
