<?php

function getConnection() {
    require_once 'secret/db-credentials.php';
    try {
        $conn = new PDO("mysql:host=$dbHost;dbname=$dbDatabase", $dbUser, $dbPassword); // variables from db-credentials.php
        return $conn;
    } catch(PDOException $e) {
        die('Could not connect to database ' . $e);
    }
}

?>