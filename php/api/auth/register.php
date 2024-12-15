<?php
header("Access-Control-Allow-Origin: /monasbtak.org");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('/monasbtak.org/php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['username']) && isset($data['email']) && isset($data['pwd']) && isset($data['phonenumber']) && isset($data['gender']) && isset($data['account_type']) && isset($data['resume'])) {
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['pwd'];
        $phonenumber = $data['phonenumber'];
        $gender = $data['gender'];
        $accountType = $data['account_type'];
        $resume = $data['resume'];
        $action = 'Pending';

        // Validate password
        $passwordPattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/';
        if (!preg_match($passwordPattern, $password)) {
            echo json_encode(['error' => 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character']);
            exit;
        }

        $password = password_hash($password, PASSWORD_DEFAULT); // Hash password

        try {
            // Check if username already exists
            $sql = "(SELECT COUNT(*) FROM users WHERE username = :username) UNION ALL (SELECT COUNT(*) FROM planners WHERE username = :username)";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $results = $stmt->fetchAll(PDO::FETCH_COLUMN); // fetch all columns
            $totalCount = array_sum($results);

            if ($totalCount > 0) {
                echo json_encode(['error' => 'Username already exists']);
                exit;
            }

             // Check if email already exists
             $sql = "(SELECT COUNT(*) FROM users WHERE email = :email) UNION ALL (SELECT COUNT(*) FROM planners WHERE email = :email)";
             $stmt = $pdo->prepare($sql);
             $stmt->bindParam(':email', $email);
             $stmt->execute();
             
             $results = $stmt->fetchAll(PDO::FETCH_COLUMN); // fetch all columns
             $totalCount = array_sum($results);
 
             if ($totalCount > 0) {
                 echo json_encode(['error' => 'email already exists']);
                 exit;
             }

            // Check if phonenumber already exists
            $sql = "(SELECT COUNT(*) FROM users WHERE phonenumber = :phonenumber) UNION ALL (SELECT COUNT(*) FROM planners WHERE phonenumber = :phonenumber)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':phonenumber', $phonenumber);
            $stmt->execute();
            
            $results = $stmt->fetchAll(PDO::FETCH_COLUMN); // fetch all columns
            $totalCount = array_sum($results);
 
             if ($totalCount > 0) {
                echo json_encode(['error' => 'Phonenumber already exists']);
                exit;
            }

            if ($accountType == "customer"){
                $sql = "INSERT INTO users (username, email,pwd, phonenumber, gender, account_type ) VALUES (:username, :email, :pwd, :phonenumber, :gender, :account_type)";

                // Prepare the insert statement
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':pwd', $password);
                $stmt->bindParam(':phonenumber', $phonenumber);
                $stmt->bindParam(':gender', $gender);
                $stmt->bindParam(':account_type', $accountType);
                

            } else {
                $sql = "INSERT INTO planners (username, email, pwd, phonenumber, gender, action, account_type, resume) VALUES (:username, :email, :pwd, :phonenumber, :gender, :action, :account_type, :resume)";
    
                // Prepare the insert statement
                $stmt = $pdo->prepare($sql);

                // Bind parameters
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':pwd', $password);
                $stmt->bindParam(':phonenumber', $phonenumber);
                $stmt->bindParam(':gender', $gender);
                $stmt->bindParam(':action', $action);
                $stmt->bindParam(':account_type', $accountType);
                $stmt->bindParam(':resume', $resume);

            }
            

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(['success' => 'registered successfully']);
            } else {
                echo json_encode(['error' => 'Failed to register ']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Failed to register user: ' . $e->getMessage()]);
        }
    } else {
        // Debugging: Log the missing fields
        $missing_fields = [];
        if (!isset($data['username'])) $missing_fields[] = 'username';
        if (!isset($data['email'])) $missing_fields[] = 'email';
        if (!isset($data['pwd'])) $missing_fields[] = 'pwd';
        if (!isset($data['phonenumber'])) $missing_fields[] = 'phonenumber';
        if (!isset($data['gender'])) $missing_fields[] = 'gender';
        if (!isset($data['account_type'])) $missing_fields[] = 'account_type';
        if ($accountType == 'planner' && !isset($data['resume'])) $missing_fields[] = 'resume' ;
        error_log('Missing fields: ' . implode(', ', $missing_fields));

        echo json_encode(['error' => 'Invalid input']);
    }
}
?>