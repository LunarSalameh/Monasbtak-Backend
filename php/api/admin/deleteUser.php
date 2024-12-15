<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true); 

    if (!isset($data['username']) || !isset($data['account_type'])) {
        echo json_encode(["status" => "error", "message" => "Invalid input. Username and account type are required."]);
        exit;
    }

    $username = $data['username'];
    $accountType = $data['account_type'];

    if ($accountType === 'customer') {
        $sql = "UPDATE users SET IsDeleted = true WHERE username = :username ";
    } elseif ($accountType === 'planner') {
        $sql = "UPDATE planners SET IsDeleted = true WHERE username = :username ";
    } 
    else {
        echo json_encode(["status" => "error", "message" => "Invalid account type."]);
        exit;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':username' => $username]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "User deleted."]);
    } else {
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error occurred.']);
}
?>
