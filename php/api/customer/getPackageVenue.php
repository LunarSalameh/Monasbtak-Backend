<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(__DIR__ . '/../../config/dbh.inc.php');
try {
    $venue_id = isset($_GET['venue_id']) ? filter_var($_GET['venue_id'], FILTER_VALIDATE_INT) : null;
    $subCategory_id = isset($_GET['subCategory_id']) ? filter_var($_GET['subCategory_id'], FILTER_VALIDATE_INT) : null;

    if ($venue_id) {
        $sql = "SELECT id, name, description, price, image, location, subCat_name, category_id, subCategory_id, status, planner_id
                FROM packeges 
                WHERE venue_id = :venue_id AND status = 'Accepted' AND IsDeleted = 0";
        
        if ($subCategory_id) {
            $sql .= " AND subCategory_id = :subCategory_id";
        }

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':venue_id', $venue_id, PDO::PARAM_INT);
        if ($subCategory_id) {
            $stmt->bindParam(':subCategory_id', $subCategory_id, PDO::PARAM_INT);
        }
        $stmt->execute();

        $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($packages as &$package) {
            if (isset($package['image'])) {
                $package['image'] = base64_encode($package['image']);
            }
        }

        if ($packages) {
            echo json_encode(['status' => 'success', 'data' => $packages]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No packages found for the given venue_id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid venue_id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
