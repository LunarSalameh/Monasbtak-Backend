<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once(__DIR__ . '/../../../php/config/dbh.inc.php');
include('/php/api/admin/emailStatusChange.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['status'])){

    $venueId = $data['id'];
    $status = $data['status'];

    $newStatus = $status === 'Accepted' ? 'Accepted' : 'Rejected';

    try{
        if ($newStatus==='Accepted'){
            $stmt = $pdo->prepare("UPDATE venues SET status = :status WHERE id = :id ");
        }
        else if ($newStatus === 'Rejected'){
            $stmt = $pdo->prepare("UPDATE venues SET status = :status WHERE id = :id ");
        }
        
        $stmt->bindParam(':status', $newStatus);
        $stmt->bindParam(':id', $venueId);

        if ($stmt->execute()){
            echo json_encode(['success' => true, 'message' => 'venue status updated successfully']);

        }

        else {
            echo json_encode(['success' => false, 'message' => 'Failed to update venue status']);
        }


    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}


?>