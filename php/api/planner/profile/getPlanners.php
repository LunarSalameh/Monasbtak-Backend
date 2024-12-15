<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$pdo = include_once('/monasbtak.org/php/config/dbh.inc.php');

// Fetch Data the planners table
$sql = "SELECT * FROM planners";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$planners = $stmt->fetchAll(PDO::FETCH_ASSOC); 

if (count($planners) > 0) {
    echo json_encode(['success' => true, 'planners' => $planners]);
} else {
    echo json_encode(['success' => true, 'planners' => []]);
}

