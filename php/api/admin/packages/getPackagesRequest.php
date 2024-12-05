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
    // Prepare the SQL query to fetch packages
    $sql = "SELECT id, name, description, price, image, location, subCat_name, category_id, planner_name FROM packeges WHERE status = 'Pending'"; 
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch the packages data
    $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Base64 encode the image data
    foreach ($packages as &$package) {
        if (isset($package['image'])) {
            $package['image'] = base64_encode($package['image']);
        }
    }

    if ($packages) {
        // Return the packages as JSON
        echo json_encode(['status' => 'success', 'data' => $packages]);
    } else {
        // No packages found
        echo json_encode(['status' => 'error', 'message' => 'No packages found']);
    }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
