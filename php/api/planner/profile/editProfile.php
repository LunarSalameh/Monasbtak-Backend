<?php
session_start(); // Start the session

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');
// $planner = include('/php/api/planner/getOnePlanner.php');

$data = json_decode(file_get_contents('php://input'), true);

$plannerId = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

if (isset($data['username']) && 
    isset($data['email']) && 
    isset($data['age']) && 
    isset($data['phonenumber']) && 
    isset($data['description']) &&
    isset($data['gender']) &&
    isset($data['image']) 
) {

    $username = $data['username'];
    $email = $data['email'];
    $age = $data['age'];
    $formattedAge = (new DateTime($age))->format('Y-m-d');

    $phonenumber = $data['phonenumber'];
    $description = $data['description'];
    $gender = $data['gender'];
    $image = $data['image']; 

    // Decode base64 image
    $decodedImage = base64_decode($image);

    try {
        $sql = "UPDATE planners SET username = :username, email = :email, age = :age, phonenumber = :phonenumber, description = :description, gender = :gender, image = :image WHERE id = :plannerId";

        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':plannerId', $plannerId);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':age', $formattedAge);
        $stmt->bindParam(':phonenumber', $phonenumber);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':image', $decodedImage); 

        if ($stmt->execute()){
            echo json_encode(['success' => true, 'message' => 'Planner profile updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update planner profile']);
        }

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
