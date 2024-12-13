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
    $user_id = isset($_GET['user_id']) ? filter_var($_GET['user_id'], FILTER_VALIDATE_INT) : null;
    $IsDeleted = 0;
    
    if ($user_id) {
        $sql = "SELECT id, name, status, eventTime, attendings, eventDay, package_id FROM events 
                WHERE user_id = :user_id AND IsDeleted = :IsDeleted  AND status = 'finished' || status = 'rejected' || status = 'canceled'";
        
      
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid user_id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
