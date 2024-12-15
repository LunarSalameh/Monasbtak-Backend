<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(__DIR__ . '/../php/config/dbh.inc.php');
$inputData = json_decode(file_get_contents('php://input'), true);

try {
    $planner_name = $inputData['plannerName'];
    $venue_name = $inputData['venueName'];

    if ($planner_name && $venue_name) {
        
        // get planner ID
        $plannerQuery = "SELECT id FROM planners WHERE username = :planner_name";
        $plannerStmt = $pdo->prepare($plannerQuery);
        $plannerStmt->bindParam(':planner_name', $planner_name);
        $plannerStmt->execute();
        $planner = $plannerStmt->fetch(PDO::FETCH_ASSOC);

        // get venue ID
        $venueQuery = "SELECT id FROM venues WHERE name = :venue_name";
        $venueStmt = $pdo->prepare($venueQuery);
        $venueStmt->bindParam(':venue_name', $venue_name);
        $venueStmt->execute();
        $venue = $venueStmt->fetch(PDO::FETCH_ASSOC);

        if ($planner && $venue) {
            // Check if the venue is already assigned to the planner
            $checkvenueQuery = "SELECT COUNT(*) FROM planner_venue WHERE planner_id = :planner_id AND venue_id = :venue_id";
            $checkvenueStmt = $pdo->prepare($checkvenueQuery);
            $checkvenueStmt->bindParam(':planner_id', $planner['id']);
            $checkvenueStmt->bindParam(':venue_id', $venue['id']);
            $checkvenueStmt->execute();
            $existingvenue = $checkvenueStmt->fetchColumn();

            // If the venue is not already assigned to the planner, insert it
            if ($existingvenue == 0) {
                $sql = "INSERT INTO planner_venue (planner_id, venue_id) VALUES (:planner_id, :venue_id)";
                $stmt = $pdo->prepare($sql);

                $stmt->bindParam(':planner_id', $planner['id']);
                $stmt->bindParam(':venue_id', $venue['id']);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'venue added to planner']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to add venue/Planner']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'This venue is already assigned to the planner']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid planner or venue name']);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Planner name and venue name are required']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
