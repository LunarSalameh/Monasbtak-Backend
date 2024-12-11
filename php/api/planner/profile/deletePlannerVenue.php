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

$inputData = json_decode(file_get_contents('php://input'), true);

try {
    $planner_id = $inputData['id'];
    $venue_name = $inputData['venueName'];

    if ($planner_id && $venue_name) {

        // Get venue ID
        $venueQuery = "SELECT id FROM venues WHERE name = :venue_name";
        $venueStmt = $pdo->prepare($venueQuery);
        $venueStmt->bindParam(':venue_name', $venue_name);
        $venueStmt->execute();
        $venue = $venueStmt->fetch(PDO::FETCH_ASSOC);

        if ($venue) {

            $checkVenueQuery = "SELECT COUNT(*) FROM planner_venue WHERE planner_id = :planner_id AND venue_id = :venue_id";
            $checkVenueStmt = $pdo->prepare($checkVenueQuery);
            $checkVenueStmt->bindParam(':planner_id', $planner_id);
            $checkVenueStmt->bindParam(':venue_id', $venue['id']);
            $checkVenueStmt->execute();
            $existingVenue = $checkVenueStmt->fetchColumn();

            if ($existingVenue > 0) {
                $sql = "DELETE FROM planner_venue WHERE planner_id = :planner_id AND venue_id = :venue_id";
                $stmt = $pdo->prepare($sql);

                $stmt->bindParam(':planner_id', $planner_id);
                $stmt->bindParam(':venue_id', $venue['id']);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'venue deleted from planner']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to delete venue']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'This venue is not assigned to the planner']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid venue name']);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Planner ID and venue name are required']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>