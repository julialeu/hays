<?php

require_once 'config.php'; //Include configuration file

//Check if request is POST and term is set
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['term'])) {
    $term = trim($_POST['term']); //Remove leading and trailing spaces

    if (!empty($term)) {
        $stmt = $pdo->prepare("INSERT INTO search_history (term) VALUES (:term)");

        try {
            $stmt->execute(['term' => $term]); //Execute the prepared statement with bound parameter
            echo "Search term saved successfully."; //Confirmation message
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage(); //Display error message
        }
    } else {
        echo "Search term is empty."; //Handle empty search term
    }
} else {
    echo "Invalid request."; //Handle invalid request
}
