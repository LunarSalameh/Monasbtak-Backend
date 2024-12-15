<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$pdo = include_once(' /php/config/dbh.inc.php');

// Fetch Data the categories table
$sql = "SELECT id,name,image FROM categories";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$categories = $stmt->fetchAll(PDO::FETCH_ASSOC); 

foreach ($categories as &$category) {
    $category['image'] = base64_encode($category['image']);
}


if (count($categories) > 0) {
    echo json_encode(['success' => true, 'categories' => $categories]);
} else {
    echo json_encode(['success' => true, 'categories' => []]);
}

