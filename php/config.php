<?php
//Database configuration
$host = "localhost";
$user = "root";
$pass = "";
$db = "seeker_db";
$charset = "utf8mb4"; //Character encoding for better compatibility

//Data source name for PDO connection
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

//PDO options for secure and optimized databse interactions
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //Enable exception handling
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //Fetch results as associative arrays
    PDO::ATTR_EMULATE_PREPARES => false //Disable emulated prepared statements for security
];

try {
    //Create PDO instance for database connection
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    //Throw exception if connection fails
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
