<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('/monasbtak.org/php/config/dbh.inc.php');


try{
    $planner_id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    if ($planner_id){
        $sql = "SELECT username, email, age, phonenumber, description, gender, image FROM planners WHERE id=:id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $planner_id, PDO::PARAM_INT);
        $stmt->execute();

        $planner = $stmt->fetch(PDO::FETCH_ASSOC);

        if (isset($planner['image'])) {
            $planner['image'] = base64_encode($planner['image']);
        }

        echo json_encode(['success' => true, 'planner' => $planner]);

    }else{
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    }

}catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>