<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(__DIR__ . '/../php/config/dbh.inc.php');    $input = json_decode(file_get_contents('php://input'), true);

try {

    $event_Id = isset($input['event_Id']) ? filter_var($input['event_Id'], FILTER_VALIDATE_INT) : null;
    $IsDeleted = 1;


    if ($event_Id) {
        $sql = "UPDATE events SET IsDeleted = :IsDeleted WHERE id = :event_Id";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':event_Id', $event_Id, PDO::PARAM_INT);
        $stmt->bindParam(':IsDeleted', $IsDeleted, PDO::PARAM_INT);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'event deleted']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No event is found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input parameters']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
