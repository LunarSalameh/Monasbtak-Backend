<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(' /php/config/dbh.inc.php');

// Log received data for debugging
$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !isset($data['venue_id']) || !isset($data['subCategory_id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid input']);
    exit;
}

// Correct table name in query
$venue_id = $data['venue_id'];
$subCategory_id = $data['subCategory_id'];

$stmt = $pdo->prepare('DELETE FROM venue_subcategory WHERE venue_id = :venue_id AND subCategory_id = :subCategory_id');
$stmt->execute(['venue_id' => $venue_id, 'subCategory_id' => $subCategory_id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['message' => 'Package deleted successfully']);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Package not found']);
}