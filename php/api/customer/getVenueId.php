<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    $subCategory_id = isset($_GET['subCategory_id']) ? filter_var($_GET['subCategory_id'], FILTER_VALIDATE_INT) : null;

    if ($subCategory_id) {
        $sql = "SELECT id, venue_id, subCategory_id FROM venue_subcategory WHERE subCategory_id = :subCategory_id"; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':subCategory_id', $subCategory_id, PDO::PARAM_INT);
        $stmt->execute();

        $subCategory = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($subCategory) {
            echo json_encode(['status' => 'success', 'subCategories' => $subCategory]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No subCategory found for the given subCategory_id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid subCategory_id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
