<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

try{
    $sql="(
            SELECT username, email, phonenumber, age, gender,account_type, NULL as action, IsDeleted FROM users WHERE IsDeleted = false 
        )
        UNION ALL
        (
            SELECT username, email, phonenumber,age, gender, account_type, action, IsDeleted FROM planners  WHERE IsDeleted = false 
        )";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $allUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'users' => $allUsers]);

}catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>