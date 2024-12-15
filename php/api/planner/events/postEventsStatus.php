<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(__DIR__ . '/../php/config/dbh.inc.php');
try {
    $input = json_decode(file_get_contents('php://input'), true);

    $planner_Id = isset($input['planner_Id']) ? filter_var($input['planner_Id'], FILTER_VALIDATE_INT) : null;
    $event_Id = isset($input['event_Id']) ? filter_var($input['event_Id'], FILTER_VALIDATE_INT) : null;
    $status = isset($input['status']) ? filter_var($input['status']) : null;
    $IsDeleted = 0;

    if ($planner_Id && $event_Id && $status) {
        $sql = "UPDATE events SET status = :status WHERE planner_Id = :planner_Id AND id = :event_Id AND IsDeleted = :IsDeleted";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':planner_Id', $planner_Id, PDO::PARAM_INT);
        $stmt->bindParam(':event_Id', $event_Id, PDO::PARAM_INT);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->bindParam(':IsDeleted', $IsDeleted, PDO::PARAM_INT);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Status updated']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No events found or no rows affected']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input parameters']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
