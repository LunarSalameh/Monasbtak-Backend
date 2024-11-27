<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = include_once('/opt/lampp/htdocs/Monasbtak-Backend/php/config/dbh.inc.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['username']) && isset($data['pwd']) && isset($data['phonenumber']) && isset($data['gender'])) {
        $username = $data['username'];
        $password = $data['pwd'];
        $phonenumber = $data['phonenumber'];
        $gender = $data['gender'];

        // Validate password
        $passwordPattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/';
        if (!preg_match($passwordPattern, $password)) {
            echo json_encode(['error' => 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character']);
            exit;
        }

        $password = password_hash($password, PASSWORD_DEFAULT); // Hash password

        try {
            // Check if username already exists
            $sql = "SELECT COUNT(*) FROM users WHERE username = :username";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            if ($stmt->fetchColumn() > 0) {
                echo json_encode(['error' => 'Username already exists']);
                exit;
            }

            // Check if phonenumber already exists
            $sql = "SELECT COUNT(*) FROM users WHERE phonenumber = :phonenumber";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':phonenumber', $phonenumber);
            $stmt->execute();
            if ($stmt->fetchColumn() > 0) {
                echo json_encode(['error' => 'Phonenumber already exists']);
                exit;
            }

            // Prepare the insert statement
            $sql = "INSERT INTO users (username, pwd, phonenumber, gender) VALUES (:username, :pwd, :phonenumber, :gender)";
            $stmt = $pdo->prepare($sql);

            // Bind parameters
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':pwd', $password);
            $stmt->bindParam(':phonenumber', $phonenumber);
            $stmt->bindParam(':gender', $gender);

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(['success' => 'User registered successfully']);
            } else {
                echo json_encode(['error' => 'Failed to register user']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Failed to register user: ' . $e->getMessage()]);
        }
    } else {
        // Debugging: Log the missing fields
        $missing_fields = [];
        if (!isset($data['username'])) $missing_fields[] = 'username';
        if (!isset($data['pwd'])) $missing_fields[] = 'pwd';
        if (!isset($data['phonenumber'])) $missing_fields[] = 'phonenumber';
        if (!isset($data['gender'])) $missing_fields[] = 'gender';
        error_log('Missing fields: ' . implode(', ', $missing_fields));

        echo json_encode(['error' => 'Invalid input']);
    }
}
?>