<?php

// Set necessary headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Cache-Control: no-cache, must-revalidate");

// Include the database connection
$pdo = require_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

try {
    // Check if user_id is provided in the GET request
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        // Get the user_id from the GET parameter
        $userId = $_GET['id'];

        // Query to fetch favorite packages for the given user_id
        $query = "SELECT packages_id FROM favorite
                  WHERE favorite.user_id = :user_id;";

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch all matching favorites
        $favorite = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

        if ($favorite) {
            echo json_encode(['success' => true, 'data' => $favorite]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No favorites found for the given id']);
        }

    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>