<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(__DIR__ . '/../../../config/dbh.inc.php');
$inputData = json_decode(file_get_contents('php://input'), true);

try {
    $planner_id = $inputData['id'];
    $category_name = $inputData['catName'];

    if ($planner_id && $category_name) {

        // Get category ID
        $categoryQuery = "SELECT id FROM categories WHERE name = :category_name";
        $categoryStmt = $pdo->prepare($categoryQuery);
        $categoryStmt->bindParam(':category_name', $category_name);
        $categoryStmt->execute();
        $category = $categoryStmt->fetch(PDO::FETCH_ASSOC);

        if ($category) {

            $checkCategoryQuery = "SELECT COUNT(*) FROM planner_category WHERE planner_id = :planner_id AND category_id = :category_id";
            $checkCategoryStmt = $pdo->prepare($checkCategoryQuery);
            $checkCategoryStmt->bindParam(':planner_id', $planner_id);
            $checkCategoryStmt->bindParam(':category_id', $category['id']);
            $checkCategoryStmt->execute();
            $existingCategory = $checkCategoryStmt->fetchColumn();

            if ($existingCategory > 0) {
                $sql = "DELETE FROM planner_category WHERE planner_id = :planner_id AND category_id = :category_id";
                $stmt = $pdo->prepare($sql);

                $stmt->bindParam(':planner_id', $planner_id);
                $stmt->bindParam(':category_id', $category['id']);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Category deleted from planner']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to delete Category']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'This category is not assigned to the planner']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid category name']);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Planner ID and category name are required']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
