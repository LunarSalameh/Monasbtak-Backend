<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$pdo = include_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

// user
$sqlUser = "SELECT COUNT(*) FROM users";
$stmtUser = $pdo->prepare($sqlUser);
$stmtUser->execute();
$users = $stmtUser->fetch(PDO::FETCH_ASSOC);

// venues
$sqlVenues = "SELECT COUNT(*) FROM venues";
$stmtVenues = $pdo->prepare($sqlVenues);
$stmtVenues->execute();
$venues = $stmtVenues->fetch(PDO::FETCH_ASSOC);


// planners
$sqlPlanner = "SELECT COUNT(*) FROM planners";
$stmtPlanner = $pdo->prepare($sqlPlanner);
$stmtPlanner->execute();
$planners = $stmtPlanner->fetch(PDO::FETCH_ASSOC);

if ($users && $venues && $planners) {
    echo json_encode([
        'success' => true,
        'users' => $users['COUNT(*)'],
        'venues' => $venues['COUNT(*)'],
        'planners' => $planners['COUNT(*)']
    ]);
} else {
    echo json_encode(['success' => false, 'users' => 0, 'venues' => 0, 'planners' => 0]);  
}
?>
