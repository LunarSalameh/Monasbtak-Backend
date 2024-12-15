<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Parse the raw JSON input
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        echo json_encode(['success' => false, 'message' => 'Image ID is required.']);
        exit();
    }

    $id = $data['id'];

    try {
        // Check if the image exists
        $checkStmt = $pdo->prepare("SELECT id FROM event_Album WHERE id = :id");
        $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
        $checkStmt->execute();

        if ($checkStmt->rowCount() === 0) {
            echo json_encode(['success' => false, 'message' => 'Image not found.']);
            exit();
        }

        // Delete the image
        $deleteStmt = $pdo->prepare("DELETE FROM event_Album WHERE id = :id");
        $deleteStmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($deleteStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Image deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete image.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
