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
    // Fetch all names from categories table
    $stmt = $pdo->query('SELECT id, name FROM venues');
    $venues = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Combine results into a single array
    $result = [
        'venues' => $venues,
    ];

    // Return the result as JSON
    http_response_code(200);
    echo json_encode($result);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}