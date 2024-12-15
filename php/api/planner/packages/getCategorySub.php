<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(__DIR__ . '/../../../config/dbh.inc.php');
try {
    // Fetch all names from categories table except 'Customized'
    $stmt = $pdo->query("SELECT id, name FROM categories WHERE name != 'Customized'");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch both name and category_id from sub_categories table except 'Coming Soon'
    $stmt = $pdo->query("SELECT id, name, category_id FROM sub_categories WHERE name != 'Coming Soon'");
    $sub_categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Combine results into a single array
    $result = [
        'categories' => $categories,
        'sub_categories' => $sub_categories
    ];

    // Return the result as JSON
    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}