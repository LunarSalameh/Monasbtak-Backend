<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $planner_Id = isset($input['planner_Id']) ? filter_var($input['planner_Id'], FILTER_VALIDATE_INT) : null;
    $id = isset($input['id']) ? filter_var($input['id'], FILTER_VALIDATE_INT) : null;
    $IsDeleted = 0 ;

    if ($planner_Id !== false && $id !== false) {
        $sql = "UPDATE events SET status = 'in progress' WHERE planner_Id = :planner_Id AND id = :id AND status = 'pending' AND IsDeleted = :IsDeleted";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':planner_Id', $planner_Id, PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':IsDeleted', $IsDeleted);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Status updated to In progress']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No pending events found for the given planner_Id and id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid planner_Id or id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
