
<?php

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once(' /php/config/dbh.inc.php');

try {
    $user_id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;
    $IsDeleted = 0;

    if ($user_id) {
        $sql = "SELECT id, name, status, eventTime, attendings, eventDay, package_id FROM events 
                WHERE user_id = :user_id AND IsDeleted = :IsDeleted AND status = 'finished' || status = 'rejected' || status = 'canceled'";
                 $stmt = $pdo->prepare($sql);
                 $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                 $stmt->bindParam(':IsDeleted', $IsDeleted);

                 $stmt->execute();
                 $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($events) {
            echo json_encode(['status' => 'success', 'data' => $events]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No events found for the given user_id']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid user_id']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>