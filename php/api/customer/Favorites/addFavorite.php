<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin:  http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('/monasbtak.org/php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if userId and packageId are set
    if (!isset($data['userId']) || !isset($data['packageId'] )) {
        echo json_encode(['error' => 'Missing userId or packageId']);
        exit();
    }

    $packageId = $data['packageId'];
    $userId = $data['userId'];
    $isFavorited = $data['isFavorited'];

    if ($isFavorited) {
        $stmt = $pdo->prepare("INSERT INTO favorite (user_id, packages_id) VALUES ( :user_id, :packages_id)");
        try {
            $stmt->execute(['user_id' => $userId, 'packages_id' => $packageId]);
            echo json_encode(['message' => 'Package added to favorites']);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Error adding to favorites: ' . $e->getMessage()]);
        }
    } else {
        $stmt = $pdo->prepare("DELETE FROM favorite WHERE user_id = :user_id AND packages_id = :packages_id");
        try {
            $stmt->execute(['user_id' => $userId, 'packages_id' => $packageId]);
            echo json_encode(['message' => 'Package removed from favorites']);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Error removing from favorites: ' . $e->getMessage()]);
        }
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>