<?php 
    /**
     * Fichero para eliminar. Recoge el id enviado por GET y realiza la operación de eliminado en la base de datos. Después redirige a la lista.
     *
     */
    $connection = require_once 'connection.php';

    $id = $_GET['id'];

    $query = "DELETE FROM productos WHERE id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':id', $id, PDO::PARAM_INT);
    $statement->execute();

    header("Location: list.php");
    exit();
?>