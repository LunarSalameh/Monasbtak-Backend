<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(' /php/config/dbh.inc.php');


try{
    $admin_id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    if ($admin_id){
        $sql = "SELECT username, email FROM admin WHERE id=:id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $admin_id, PDO::PARAM_INT);
        $stmt->execute();

        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'admin' => $admin]);

    }else{
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    }

}catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>