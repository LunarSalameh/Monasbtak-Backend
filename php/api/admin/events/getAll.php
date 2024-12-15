<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    $sql = "SELECT id, name, status, eventTime, attendings, eventDay, package_id, user_Id FROM events WHERE IsDeleted=0 ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($events) {
        echo json_encode(['status' => 'success', 'data' => $events]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No events found']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>