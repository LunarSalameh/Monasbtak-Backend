<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(__DIR__ . '/../../../config/dbh.inc.php');

try{
   $stmt = $pdo->prepare("SELECT id,name,location,description, status FROM venues WHERE status='Pending'");
   $stmt->execute();

   $pendingVenues = $stmt->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode(['success' => true, 'venues' => $pendingVenues]);

} catch(PDOException $e) {
   echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

?>