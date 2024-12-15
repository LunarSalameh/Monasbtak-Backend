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


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['name'], $data['updatedName'])) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit;
    }

    $name = htmlspecialchars(trim($data['name']));
    $updatedName = htmlspecialchars(trim($data['updatedName']));

    try {
        $query = "UPDATE categories SET name = :updatedName WHERE name = :name";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':updatedName' => $updatedName,
            ':name' => $name,
        ]);

        echo json_encode(["success" => true, "message" => "Category updated successfully."]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
}
?>