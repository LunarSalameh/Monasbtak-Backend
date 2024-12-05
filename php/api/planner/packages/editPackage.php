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
$pdo = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

// Get the input data
$data = json_decode(json_encode($_POST));

// Check if all required fields are provided
if (isset($data->id, $data->name, $data->description, $_FILES['image'], $data->venue_id, $data->price)) {
    $id = $data->id;
    $name = $data->name;
    $description = $data->description;
    $image = file_get_contents($_FILES['image']['tmp_name']); // Get the image file content
    $venue_id = $data->venue_id;
    $price = $data->price;

    // Prepare the SQL statement
    $stmt = $pdo->prepare("UPDATE packeges SET name = ?, description = ?, image = ?, venue_id = ?, price = ? WHERE id = ?");
    if ($stmt->execute([$name, $description, $image, $venue_id, $price, $id])) {
        echo json_encode(["message" => "Package updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update package"]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}


