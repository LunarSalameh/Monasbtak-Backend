<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection
$pdo = require_once('https://monasbtak.org/php/config/dbh.inc.php');

try {
    $category_id = isset($_GET['category_id']) ? filter_var($_GET['category_id'], FILTER_VALIDATE_INT) : null;

    if ($category_id) {
         $sql = "SELECT id,name FROM sub_categories WHERE category_id = :category_id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $stmt->execute();

        $subCategories = $stmt->fetchAll(PDO::FETCH_ASSOC); 
        
        if (!empty($subCategories)) {
            echo json_encode(['success' => true, 'subCategories' => $subCategories]);
        } else {
            echo json_encode(['success' => true, 'subCategories' => []]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid categories ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
