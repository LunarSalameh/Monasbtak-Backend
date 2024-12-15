<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(' /php/config/dbh.inc.php');

$inputData = json_decode(file_get_contents('php://input'), true);

try {
    $planner_name = $inputData['plannerName'];
    $category_name = $inputData['catName'];

    if ($planner_name && $category_name) {
        
        // get planner ID
        $plannerQuery = "SELECT id FROM planners WHERE username = :planner_name";
        $plannerStmt = $pdo->prepare($plannerQuery);
        $plannerStmt->bindParam(':planner_name', $planner_name);
        $plannerStmt->execute();
        $planner = $plannerStmt->fetch(PDO::FETCH_ASSOC);

        // get category ID
        $categoryQuery = "SELECT id FROM categories WHERE name = :category_name";
        $categoryStmt = $pdo->prepare($categoryQuery);
        $categoryStmt->bindParam(':category_name', $category_name);
        $categoryStmt->execute();
        $category = $categoryStmt->fetch(PDO::FETCH_ASSOC);

        if ($planner && $category) {
            // Check if the category is already assigned to the planner
            $checkCategoryQuery = "SELECT COUNT(*) FROM planner_category WHERE planner_id = :planner_id AND category_id = :category_id";
            $checkCategoryStmt = $pdo->prepare($checkCategoryQuery);
            $checkCategoryStmt->bindParam(':planner_id', $planner['id']);
            $checkCategoryStmt->bindParam(':category_id', $category['id']);
            $checkCategoryStmt->execute();
            $existingCategory = $checkCategoryStmt->fetchColumn();

            // If the category is not already assigned to the planner, insert it
            if ($existingCategory == 0) {
                $sql = "INSERT INTO planner_category (planner_id, category_id) VALUES (:planner_id, :category_id)";
                $stmt = $pdo->prepare($sql);

                $stmt->bindParam(':planner_id', $planner['id']);
                $stmt->bindParam(':category_id', $category['id']);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Category added to planner']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to add Category/Planner']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'This category is already assigned to the planner']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid planner or category name']);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Planner name and category name are required']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
