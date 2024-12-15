<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$pdo = require_once(__DIR__ . '/../../php/config/dbh.inc.php');

// Fetch Data the users table
$sql = "SELECT id, username, email,pwd, phonenumber, gender, account_type, age,IsDeleted FROM users";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);  

if (count($users) > 0) {
    echo json_encode(['success' => true, 'users' => $users]);
} else {
    echo json_encode(['success' => true, 'users' => []]);  
}

