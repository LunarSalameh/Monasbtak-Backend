<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Preflight request
}

// Log received data for debugging
$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !isset($data['id']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid input']);
    exit;
}

// Correct table name in query
$id = $data['id'];
$status = $data['status'] === 'Accepted' ? 'Accepted' : 'Rejected';

$stmt = $pdo->prepare('UPDATE packeges SET status = :status WHERE id = :id');
$stmt->execute(['status' => $status, 'id' => $id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['message' => 'Status updated successfully']);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Package not found']);
}