<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$pdo = include_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

// Fetch Data the planners table
$sql = "SELECT id,name FROM venues";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$venues = $stmt->fetchAll(PDO::FETCH_ASSOC); 

if (count($venues) > 0) {
    echo json_encode(['success' => true, 'venues' => $venues]);
} else {
    echo json_encode(['success' => true, 'venues' => []]);
}

