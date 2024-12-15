<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(__DIR__ . '/../../../config/dbh.inc.php');
try {
    $planner_Id = isset($_GET['planner_Id']) ? filter_var($_GET['planner_Id'], FILTER_VALIDATE_INT) : null;
    $IsDeleted = 0 ;

    if ($planner_Id) {
        $sql = "SELECT id, name, status, eventTime, attendings, eventDay, package_id, user_Id FROM events 
                WHERE planner_Id = :planner_Id AND IsDeleted = :IsDeleted AND status = 'finished'";
                 $stmt = $pdo->prepare($sql);
                 $stmt->bindParam(':planner_Id', $planner_Id, PDO::PARAM_INT);
                 $stmt->bindParam(':IsDeleted', $IsDeleted);

                 $stmt->execute();
                 $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($events) {
            echo json_encode(['status' => 'success', 'data' => $events]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No events found for the given planner_Id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid planner_Id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>