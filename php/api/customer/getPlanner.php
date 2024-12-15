<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(' /php/config/dbh.inc.php');

try {
    $id = isset($_GET['plannerId']) ? filter_var($_GET['plannerId'], FILTER_VALIDATE_INT) : null;

    if ($id) {
        $sql = "SELECT id, username, email, age, phonenumber, gender, description, image FROM planners WHERE id = :id"; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $planners = $stmt->fetchAll(PDO::FETCH_ASSOC);

         foreach ($planners as &$planner) {
            if (isset($planner['image'])) {
                $planner['image'] = base64_encode($planner['image']);
            }
        }

        if ($planners) {
            echo json_encode(['status' => 'success', 'data' => $planners]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No planners found for the given id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
