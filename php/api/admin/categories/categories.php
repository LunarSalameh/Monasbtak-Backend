<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

try {
    $startTime = microtime(true); // Start time logging

    $sql = "SELECT id, name, image FROM categories"; 
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($packages as &$package) {
        if (isset($package['image'])) {
            $package['image'] = base64_encode($package['image']);
        }
    }

    $endTime = microtime(true); // End time logging
    $executionTime = $endTime - $startTime;
    error_log("Query execution time: " . $executionTime . " seconds");

    if (empty($packages)) {
        echo json_encode(['success' => false, 'message' => 'No categories found.']);
        exit;
    }

    if ($packages) {
        echo json_encode($packages); // Return the packages directly
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No packages found']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
