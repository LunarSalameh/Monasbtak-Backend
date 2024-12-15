<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('/monasbtak.org/php/config/dbh.inc.php');


// Retrieve the category name from the request body
$data = json_decode(file_get_contents('php://input'));
$categoryName = $data->name;

// SQL query to delete category based on the name (since there's no id column now)
$query = "DELETE FROM categories WHERE name = :name";

try {
    // Prepare and execute the query
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':name', $categoryName);
    $stmt->execute();

    // Check if any rows were affected
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Category deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Category not found']);
    }
} catch (PDOException $e) {
    // Log the database query error to PHP error log
    error_log("Database error: " . $e->getMessage());

    // Send error response with status 500
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Log other exceptions to PHP error log
    error_log("General error: " . $e->getMessage());

    // Send a general error response with status 500
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'General error: ' . $e->getMessage()]);
}
?>