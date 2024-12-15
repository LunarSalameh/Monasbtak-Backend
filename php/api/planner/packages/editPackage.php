<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

// Get the input data
if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    $data = json_decode(file_get_contents('php://input'));
} else {
    $data = (object)$_POST;
}

// Check if all required fields are provided
if (isset($data->id)) {
    $id = $data->id;

    // Fetch existing data
    $stmt = $pdo->prepare("SELECT name, description, image, price, location FROM packeges WHERE id = ? AND IsDeleted = 0");
    $stmt->execute([$id]);
    $existingPackage = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$existingPackage) {
        echo json_encode(["message" => "Package not found"]);
        exit;
    }

    $name = $data->name ?? $existingPackage['name'];
    $description = $data->description ?? $existingPackage['description'];
    $image = isset($_FILES['image']) && $_FILES['image']['tmp_name'] ? file_get_contents($_FILES['image']['tmp_name']) : $existingPackage['image'];
    $price = $data->price ?? $existingPackage['price'];
    $location = $data->location ?? $existingPackage['location'];

    // Prepare the SQL statement
    $stmt = $pdo->prepare("UPDATE packeges SET name = ?, description = ?, image = ?, price = ?, location = ? WHERE id = ? AND IsDeleted = 0");
    if ($stmt->execute([$name, $description, $image, $price, $location, $id])) {
        echo json_encode(["message" => "Package updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update package"]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}


