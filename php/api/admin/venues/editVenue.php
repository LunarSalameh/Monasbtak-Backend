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
$pdo = require_once(__DIR__ . '/../../../config/dbh.inc.php'); // Correct relative path

// Get the input data
$data = json_decode(json_encode($_POST));

// Check if all required fields are provided
if (isset($data->id)) {
    $id = $data->id;

    // Fetch existing data
    $stmt = $pdo->prepare("SELECT name, description, image, location FROM venues WHERE id = ?");
    $stmt->execute([$id]);
    $existingVenue = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$existingVenue) {
        echo json_encode(["message" => "Venue not found"]);
        exit;
    }

    $name = $data->name ?? $existingVenue['name'];
    $description = $data->description ?? $existingVenue['description'];
    $image = isset($_FILES['image']) && $_FILES['image']['tmp_name'] ? file_get_contents($_FILES['image']['tmp_name']) : $existingVenue['image'];
    $location = $data->location ?? $existingVenue['location'];

    // Prepare the SQL statement
    $stmt = $pdo->prepare("UPDATE venues SET name = ?, description = ?, image = ?, location = ? WHERE id = ?");
    if ($stmt->execute([$name, $description, $image, $location, $id])) {
        echo json_encode(["message" => "Venue updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update venue"]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}


