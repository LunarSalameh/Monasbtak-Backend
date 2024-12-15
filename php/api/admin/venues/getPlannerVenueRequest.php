<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    $venue_id = isset($_GET['venue_id']) ? filter_var($_GET['venue_id'], FILTER_VALIDATE_INT) : null;

    if ($venue_id) {
        // Get planner_id from planner_venue table using venue_id
        $sql = "SELECT planner_id FROM planner_venue WHERE venue_id = :venue_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':venue_id', $venue_id, PDO::PARAM_INT);
        $stmt->execute();
        $planner_id = $stmt->fetchColumn();

        if ($planner_id) {
            // Get planner username from planners table using planner_id
            $sql = "SELECT username FROM planners WHERE id = :planner_id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':planner_id', $planner_id, PDO::PARAM_INT);
            $stmt->execute();
            $username = $stmt->fetchColumn();

            if ($username) {
                echo json_encode(['success' => true, 'username' => $username]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Planner not found']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid venue ID']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid venue ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
