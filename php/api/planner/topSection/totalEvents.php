<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');

try { 
    $planner_Id = isset($_GET['planner_Id']) ? filter_var($_GET['planner_Id'], FILTER_VALIDATE_INT) : null;

    if ($planner_Id === null) {
        echo json_encode(['success' => false, 'message' => 'Invalid or missing planner_Id']);
        exit;
    }

    // Query templates
    $queries = [
        'Pending' => "SELECT COUNT(*) as count FROM events WHERE status='pending' AND planner_Id = :planner_Id",
        'Accepted' => "SELECT COUNT(*) as count FROM events WHERE status='accepted' AND planner_Id = :planner_Id",
        'Finished' => "SELECT COUNT(*) as count FROM events WHERE status='finished' AND planner_Id = :planner_Id",
        'InProgress' => "SELECT COUNT(*) as count FROM events WHERE status='in progress' AND planner_Id = :planner_Id",
    ];

    $results = [];
    foreach ($queries as $key => $query) {
        $stmt = $pdo->prepare($query);
        $stmt->execute(['planner_Id' => $planner_Id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $results[$key] = $row ? $row['count'] : 0;
    }

    echo json_encode([
        'success' => true,
        'Pending' => $results['Pending'],
        'InProgress' => $results['InProgress'],
        'Accepted' => $results['Accepted'],
        'Finished' => $results['Finished']
    ]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
