<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);

$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    if (isset($_GET['category_id'])) {
        $categoryId = $_GET['category_id'];
        $plannerId = isset($_GET['planner_id']) ? $_GET['planner_id'] : null; // Optional planner_id filter

        // Construct the query with an optional planner_id filter
        $sql = "SELECT id,image FROM event_Album WHERE category_id = :category_id";
        if ($plannerId) {
            $sql .= " AND planner_id = :planner_id"; // Filter by planner_id if provided
        }

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':category_id', $categoryId, PDO::PARAM_INT);
        if ($plannerId) {
            $stmt->bindParam(':planner_id', $plannerId, PDO::PARAM_INT);
        }
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            // Convert the image from binary data to Base64 encoding
            foreach ($result as &$row) {
                $row['image'] = base64_encode($row['image']);
            }

            echo json_encode(['success' => true, 'data' => $result]);
        } else {
            echo json_encode(['success' => true, 'data' => []]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Category ID is required']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
