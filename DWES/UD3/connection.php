<?php
/**
 * Fichero para instanciar el PDO y recuperar la conexión.
 * Se llama cada vez que se desea hacer una operación contra base de datos.
 * 
 */
    $host = "localhost";
    $db = "proyecto";
    $user = "root";
    $password = "";
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    try{
        $connection = new PDO($dsn, $user, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e){
        die("Error en la conexión: " . $e->getMessage());
    }

    return $connection;
?>