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
    $category_id = isset($_GET['category_id']) ? filter_var($_GET['category_id'], FILTER_VALIDATE_INT) : null;

    if ($category_id) {
        $sql = "SELECT id, name, image FROM sub_categories WHERE category_id = :category_id"; 
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $stmt->execute();

        $subCategory = $stmt->fetchAll(PDO::FETCH_ASSOC);

         foreach ($subCategory as &$package) {
            if (isset($package['image'])) {
                $package['image'] = base64_encode($package['image']);
            }
        }

        if ($subCategory) {
            echo json_encode(['status' => 'success', 'subCategories' => $subCategory]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No subCategory found for the given category_id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid category_id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
