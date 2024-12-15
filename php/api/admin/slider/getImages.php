<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
        // Prepare the SQL query to fetch id and image from slider
        $sql = "SELECT id, image FROM slider"; 
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        // Fetch all slider data
        $sliders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($sliders) {
            // Base64 encode the image field for each slider
            foreach ($sliders as &$slider) {
                $slider['image'] = base64_encode($slider['image']);
            }
            // Return the slider data as JSON
            echo json_encode(['status' => 'success', 'data' => $sliders]);
        } else {
            // No sliders found
            echo json_encode(['status' => 'error', 'message' => 'No sliders found']);
        }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
