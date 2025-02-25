<?php

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['term'])) {
    $term = trim($_POST['term']);

    if (!empty($term)) {
        $stmt = $pdo->prepare("INSERT INTO search_history (term) VALUES (:term)");

        try {
            $stmt->execute(['term' => $term]);
            echo "Search term saved successfully.";
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Search term is empty.";
    }
} else {
    echo "Invalid request.";
}
