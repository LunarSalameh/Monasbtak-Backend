

<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');

try{
    $stmt = $pdo->prepare("SELECT id,name FROM venues WHERE status='Accepted'");
    $stmt->execute();
 
    $venues = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
    if (count($venues) > 0) {
        echo json_encode(['success' => true, 'venues' => $venues]);
    } else {
        echo json_encode(['success' => true, 'venues' => []]);
    }
 
 } catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
 }

?>