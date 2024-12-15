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
$pdo = require_once(' /php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the JSON input
    $data = json_decode(file_get_contents('php://input'), true);

    // Debugging: Log the received data
    error_log(print_r($data, true));

    if (
        isset($data['name'], $data['planner_Id'], $data['eventDay'], $data['user_Id'],
              $data['attendings'], $data['eventTime'], $data['package_id'])
    ) {
        try {
            // Check for existing event with the same user_Id and package_id
            $checkStmt = $pdo->prepare('SELECT COUNT(*) FROM events WHERE user_Id = :user_Id AND package_id = :package_id AND status NOT IN ("finished", "rejected", "canceled")');
            $checkStmt->bindParam(':user_Id', $data['user_Id']);
            $checkStmt->bindParam(':package_id', $data['package_id']);
            $checkStmt->execute();
            $existingEventCount = $checkStmt->fetchColumn();

            if ($existingEventCount > 0) {
                echo json_encode(['message' => 'You already have an ongoing event with this package.']);
                exit;
            }

            $status = 'pending';

            // Prepare the SQL statement
            $stmt = $pdo->prepare('INSERT INTO events (name, planner_Id, user_Id, eventDay, attendings, eventTime, package_id, status) 
                                   VALUES (:name, :planner_Id, :user_Id, :eventDay, :attendings, :eventTime, :package_id, :status)');

            // Bind the parameters
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':planner_Id', $data['planner_Id']);
            $stmt->bindParam(':user_Id', $data['user_Id']);
            $stmt->bindParam(':eventDay', $data['eventDay']);
            $stmt->bindParam(':attendings', $data['attendings']);
            $stmt->bindParam(':eventTime', $data['eventTime']);
            $stmt->bindParam(':package_id', $data['package_id']);
            $stmt->bindParam(':status', $status);

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Event created successfully']);
            } else {
                echo json_encode(['message' => 'Failed to create event']);
            }
        } catch (Exception $e) {
            echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['message' => 'Invalid input data']);
    }
} else {
    echo json_encode(['message' => 'Method not allowed']);
}
