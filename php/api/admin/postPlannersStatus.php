<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');
include('/php/api/admin/emailStatusChange.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['action'])){

    $plannerId = $data['id'];
    $action = $data['action'];

    $newStatus = $action === 'Accepted' ? 'Accepted' : 'Rejected';

    try{
        if ($newStatus==='Accepted'){
            $stmt = $pdo->prepare("UPDATE planners SET action = :action WHERE id = :id ");
        }
        else if ($newStatus === 'Rejected'){
            $stmt = $pdo->prepare("UPDATE planners SET action = :action, IsDeleted = true WHERE id = :id ");
        }
        
        $stmt->bindParam(':action', $newStatus);
        $stmt->bindParam(':id', $plannerId);

        if ($stmt->execute()){
            
            if ($data['action'] === 'Accepted' || $data['action'] === 'Rejected'){
                $plannerEmail = getPlannerEmail($plannerId); // A function to get the planner's email address from the DB
                $emailResponse = sendEmail($plannerEmail, $newStatus); // Call the email function
            }

            echo json_encode(['success' => true, 'message' => 'Planner status updated successfully', 'emailStatus' => $emailResponse]);

        }

        else {
            echo json_encode(['success' => false, 'message' => 'Failed to update planner status']);
        }


    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}


?>