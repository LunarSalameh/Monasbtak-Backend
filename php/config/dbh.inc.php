<?php
// DATABASE CONNECTION
$dsn = "mysql:host=127.0.0.1;dbname=montest";
$dbusername = "root";
$dbpassword = "";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "connected";
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
    error_log('Connection failed: ' . $e->getMessage());
    exit();
}
return $pdo;

