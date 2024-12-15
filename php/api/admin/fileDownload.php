<?php
header("Access-Control-Allow-Origin: https://monasbtak.org");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include the database connection
$pdo = include_once('https://monasbtak.org/php/config/dbh.inc.php');

// Define the uploads directory
$uploadDir = '/php/api/upload/';

// Ensure the uploads directory exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Handle file upload (POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if a file is being uploaded
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['resume']['tmp_name'];
        $fileName = basename($_FILES['resume']['name']);
        $fileDestPath = $uploadDir . $fileName;

        // Move the uploaded file to the uploads directory
        if (move_uploaded_file($fileTmpPath, $fileDestPath)) {
            // Save the file name or path in the database (example query)
            try {
                $stmt = $pdo->prepare("INSERT INTO planners (resume) VALUES (:resume)");
                $stmt->bindParam(':resume', $fileName);
                $stmt->execute();

                echo json_encode(['success' => true, 'message' => 'File uploaded successfully.', 'fileName' => $fileName]);
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => 'Failed to save file info to the database.', 'error' => $e->getMessage()]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to move the uploaded file.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded or file upload error.']);
    }
    exit;
}

// Handle file download (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the 'resume' parameter exists in the query string
    if (isset($_GET['resume'])) {
        $fileName = basename($_GET['resume']); // Extract the file name
        $filePath = $uploadDir . $fileName; // Full path to the file

        if (file_exists($filePath)) {
            // File found, set headers for download
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . $fileName . '"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($filePath));

            // Read and output the file
            readfile($filePath);
            exit; // Ensure no further code is executed
        } else {
            // File not found
            echo json_encode(['success' => false, 'message' => 'File not found.']);
        }
    } else {
        // Missing or invalid parameter
        echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    }
}
?>
