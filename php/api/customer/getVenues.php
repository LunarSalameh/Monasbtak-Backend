<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(__DIR__ . '/../../php/config/dbh.inc.php');
try {
    $id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    if ($id) {
        $sql = "SELECT id, name, description, image, location FROM venues WHERE id = :id"; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $venues = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($venues as &$venue) {
            if (isset($venue['image'])) {
                $venue['image'] = base64_encode($venue['image']);
            }
        }

        if ($venues) {
            echo json_encode(['status' => 'success', 'data' => $venues]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No venues found for the given id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
