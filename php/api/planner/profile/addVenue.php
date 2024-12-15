<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(__DIR__ . '/../../../config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the file was uploaded
    if (isset($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
        // Get the image binary data
        $imageData = file_get_contents($_FILES['image']['tmp_name']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Image file is required']);
        exit;
    }

    // Get the POST data
    $data = $_POST;

    if (isset($data['name'], $data['description'], $data['location'], $data['subCategory_id'])) {
        $name = $data['name'];
        $location = $data['location'];
        $description = $data['description'];
        $subCategory_id = $data['subCategory_id'];
        $status = "Pending";

        try {
            // Check if venue already exists 
            $sql = "SELECT COUNT(*) FROM venues WHERE name = :name";
            $stmtCheck = $pdo->prepare($sql);
            $stmtCheck->bindParam(':name', $name);
            $stmtCheck->execute();

            $results = $stmtCheck->fetchAll(PDO::FETCH_COLUMN);
            $totalCount = array_sum($results);

            if ($totalCount > 0) {
                echo json_encode(['success' => false, 'error' => 'venue already exists']);
                exit;
            }

            $sqlVenues = "INSERT INTO venues (name, location, description, image, status) 
                        VALUES (:name, :location, :description, :image, :status)";

            $stmtVenues = $pdo->prepare($sqlVenues);
            $stmtVenues->bindParam(':name', $name);
            $stmtVenues->bindParam(':location', $location);
            $stmtVenues->bindParam(':description', $description);
            $stmtVenues->bindParam(':image', $imageData, PDO::PARAM_LOB);
            $stmtVenues->bindParam(':status', $status);

            if ($stmtVenues->execute()) {
                $venue_id = $pdo->lastInsertId();

                $sqlSubCategories = "INSERT INTO venue_subcategory (venue_id, subCategory_id) 
                            VALUES (:venue_id, :subCategory_id)";

                $stmtSubCategories = $pdo->prepare($sqlSubCategories);
                $stmtSubCategories->bindParam(':venue_id', $venue_id);
                $stmtSubCategories->bindParam(':subCategory_id', $subCategory_id);

                if ($stmtSubCategories->execute()) {
                    http_response_code(200);
                    echo json_encode(['success' => true, 'message' => 'venues Added successfully and subCategories Connected']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to connect subCategory with venue']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to add venue']);
            }

        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }

    } else {
        $missing_fields = [];
        if (!isset($data['name'])) $missing_fields[] = 'name';
        if (!isset($data['location'])) $missing_fields[] = 'location';
        if (!isset($data['description'])) $missing_fields[] = 'description';
        if (!isset($data['subCategory_id'])) $missing_fields[] = 'subCategory_id';
        error_log('Missing fields: ' . implode(', ', $missing_fields));
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
