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
    $planner_id = isset($_GET['planner_id']) ? filter_var($_GET['planner_id'], FILTER_VALIDATE_INT) : null;

    if ($planner_id) {
         $sql = "SELECT category_id FROM planner_category WHERE planner_id = :planner_id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':planner_id', $planner_id, PDO::PARAM_INT);
        $stmt->execute();

        $categories = $stmt->fetchAll(PDO::FETCH_COLUMN); 
        
        if (!empty($categories)) {
            echo json_encode(['success' => true, 'category_ids' => $categories]);
        } else {
            echo json_encode(['success' => true, 'category_ids' => []]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid planner ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
