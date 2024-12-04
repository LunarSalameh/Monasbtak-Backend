<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');
include('/opt/lampp/htdocs/Monasbtak-Backend/php/api/admin/emailNewPlanner.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['username']) && isset($data['email']) && isset($data['pwd'])){

    $username = $data['username'];
    $email = $data['email'];
    $pwd = $data['pwd'];
    $password = $data['pwd'];

    $pwd = password_hash($pwd, PASSWORD_DEFAULT);
    $action = 'Accepted';
    
    $phonenumber = $data['phonenumber'];
    $account_type="planner";


    try{

        // USERNAME CHECK 
        $sql="(SELECT COUNT(*) FROM users WHERE username = :username) UNION ALL (SELECT COUNT(*) FROM planners WHERE username = :username)";

        $stmtCheck = $pdo->prepare($sql);
        $stmtCheck->bindParam(':username', $username);
        $stmtCheck->execute();

        $results = $stmtCheck->fetchAll(PDO::FETCH_COLUMN);
        $totalCount = array_sum($results);

        if ($totalCount > 0) {
            echo json_encode(['success' => false, 'error' => 'Username already exists']);
            exit;
        }

        // EMAIL CHECK
        $sql = "(SELECT COUNT(*) FROM users WHERE email = :email) UNION ALL (SELECT COUNT(*) FROM planners WHERE email = :email)";
        
        $stmtCheck = $pdo->prepare($sql);
        $stmtCheck->bindParam(':email', $email);
        $stmtCheck->execute();
             
        $results = $stmtCheck->fetchAll(PDO::FETCH_COLUMN); 
        $totalCount = array_sum($results);
 
        if ($totalCount > 0) {
            echo json_encode(['error' => 'email already exists']);
            exit;
        }

        // PHONENUMBER CHECK
        $sql = "(SELECT COUNT(*) FROM users WHERE phonenumber = :phonenumber) UNION ALL (SELECT COUNT(*) FROM planners WHERE phonenumber = :phonenumber)";
        $stmtCheck = $pdo->prepare($sql);
        $stmtCheck->bindParam(':phonenumber', $phonenumber);
        $stmtCheck->execute();
        
        $results = $stmtCheck->fetchAll(PDO::FETCH_COLUMN); 
        $totalCount = array_sum($results);

         if ($totalCount > 0) {
            echo json_encode(['error' => 'Phonenumber already exists']);
            exit;
        }

        // IF ALL AFE UNIQE CONTINUE. 
        $stmt = $pdo->prepare("INSERT INTO planners (username, email,phonenumber, pwd, action, account_type) VALUES (:username, :email, :phonenumber, :pwd, :action, :account_type)");
        
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':pwd', $pwd);
        $stmt->bindParam(':action', $action);       
        $stmt->bindParam(':phonenumber', $phonenumber);  
        $stmt->bindParam(':account_type', $account_type);  

        if ($stmt->execute()){
            $emailResponse = sendEmail($email, $username, $password); 
            echo json_encode(['success' => true, 'message' => 'Planner Added successfully','emailStatus' => $emailResponse]);
        }

        else {
            echo json_encode(['success' => false, 'message' => 'Failed to add planner']);
        }


    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }

} else {
    $missing_fields = [];
        if (!isset($data['username'])) $missing_fields[] = 'username';
        if (!isset($data['email'])) $missing_fields[] = 'email';
        if (!isset($data['pwd'])) $missing_fields[] = 'pwd';
        if (!isset($data['phonenumber'])) $missing_fields[] = 'phonenumber';
        error_log('Missing fields: ' . implode(', ', $missing_fields));
        
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}


?>