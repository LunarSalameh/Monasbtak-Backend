<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(__DIR__ . '/../../../config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['category_id']) || !isset($_FILES['image']) || !isset($_POST['planner_id'])) {
        echo json_encode(['success' => false, 'message' => 'Category ID, image, and planner ID are required.']);
        exit();
    }

    $category_id = $_POST['category_id'];
    $planner_id = $_POST['planner_id']; // Get planner_id from POST data
    $image = $_FILES['image'];

    // Check if category exists
    $categoryCheck = $pdo->prepare("SELECT id FROM categories WHERE id = :category_id");
    $categoryCheck->bindParam(':category_id', $category_id, PDO::PARAM_INT);
    $categoryCheck->execute();

    if ($categoryCheck->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid category ID.']);
        exit();
    }

    // Check if planner exists (optional, if needed)
    $plannerCheck = $pdo->prepare("SELECT id FROM planners WHERE id = :planner_id");
    $plannerCheck->bindParam(':planner_id', $planner_id, PDO::PARAM_INT);
    $plannerCheck->execute();

    if ($plannerCheck->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid planner ID.']);
        exit();
    }

    if ($image['error'] === UPLOAD_ERR_OK) {
        $imageData = file_get_contents($image['tmp_name']); 

        // Insert the image, category_id, and planner_id into the event_album table
        $sql = "INSERT INTO event_Album (category_id, image, planner_id) VALUES (:category_id, :image, :planner_id)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB);
        $stmt->bindParam(':planner_id', $planner_id, PDO::PARAM_INT); // Bind planner_id

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Image uploaded successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error uploading image.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
