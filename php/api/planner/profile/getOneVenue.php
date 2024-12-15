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
    $venue_id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    if ($venue_id) {
         $sql = "SELECT name FROM venues WHERE id = :venue_id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':venue_id', $venue_id, PDO::PARAM_INT); 
        $stmt->execute();

        $venue = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($venue) {
            echo json_encode(['success' => true, 'venue' => $venue]);
        } else {
            echo json_encode(['success' => false, 'message' => [] ]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid venue ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
