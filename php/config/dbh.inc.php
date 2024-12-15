<?php
// DATABASE CONNECTION
$dsn = "mysql:host=localhost;dbname=u812004406_montest";
$dbusername = "u812004406_root";
$dbpassword = "Root2002!";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    // $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "connected";
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
    error_log('Connection failed: ' . $e->getMessage());
    exit();
}
return $pdo;

