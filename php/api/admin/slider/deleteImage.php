<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = isset($data['id']) ? filter_var($data['id'], FILTER_VALIDATE_INT) : null;
    
    if ($id) {
        // Prepare the SQL query to delete the slider entry
        $sql = "DELETE FROM slider WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Return success response
        echo json_encode(['status' => 'success', 'message' => 'Slider image deleted successfully']);
    } else {
        // Invalid or missing ID
        echo json_encode(['status' => 'error', 'message' => 'Invalid or missing ID']);
    }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
