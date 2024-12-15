<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(' /php/config/dbh.inc.php');

try {
    $planner_id = isset($_GET['planner_id']) ? filter_var($_GET['planner_id'], FILTER_VALIDATE_INT) : null;

    if ($planner_id) {
         $sql = "SELECT venue_id FROM planner_venue WHERE planner_id = :planner_id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':planner_id', $planner_id, PDO::PARAM_INT);
        $stmt->execute();

        $venues = $stmt->fetchAll(PDO::FETCH_COLUMN); 
        
        if (!empty($venues)) {
            echo json_encode(['success' => true, 'venue_ids' => $venues]);
        } else {
            echo json_encode(['success' => true, 'venue_ids' => []]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid planner ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
