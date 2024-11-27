<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$pdo = include_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

// Fetch Data the users table
$sql = "SELECT id, username, email, pwd FROM users";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$users = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch data as associative array

if (count($users) > 0) {
    echo json_encode(['success' => true, 'users' => $users]);
} else {
    echo json_encode(['success' => true, 'users' => []]); // Return an empty array if no data
}

