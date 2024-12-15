<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('/monasbtak.org/php/config/dbh.inc.php');

try {
    $planner_id = isset($_GET['planner_id']) ? filter_var($_GET['planner_id'], FILTER_VALIDATE_INT) : null;

    if ($planner_id) {
        $sql = "SELECT id, name, description, price, image, location, subCat_name, category_id FROM packeges WHERE planner_id = :planner_id AND status = 'Accepted' AND IsDeleted = 0"; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':planner_id', $planner_id, PDO::PARAM_INT);
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
            echo json_encode(['status' => 'error', 'message' => 'No packages found for the given planner_id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid planner_id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
