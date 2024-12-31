<?php
/**
 * Fichero de detalle. Recibe el parámetro id enviado por GET y recupera los datos de dicho producto en la base de datos.
 * También hace una consulta a base de datos para recuperar el nombre de la familia a través del código de familia contenido en el producto.
 * Se puede solucionar haciendo un JOIN de SQL, pero lo he planteado así para no complicarme y es funcional.
 */
    $connection = require_once 'connection.php';

    $id = $_GET['id'];
    $query = "SELECT * FROM productos WHERE id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':id', $id, PDO::PARAM_INT);
    $statement->execute();

    $product = $statement->fetch(PDO::FETCH_ASSOC);
    
    $query = "SELECT nombre FROM familias WHERE cod = :cod";
    $statement = $connection->prepare($query);
    $statement->bindParam(':cod', $product['familia'], PDO::PARAM_STR);
    $statement->execute();

    $family =  $statement->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle del Producto</title>
</head>
<body>
    <h1>Detalle del Producto</h1>
    <p><strong>ID:</strong> <?= htmlspecialchars($product['id']) ?></p>
    <p><strong>Nombre:</strong> <?= htmlspecialchars($product['nombre']) ?></p>
    <p><strong>Nombre corto:</strong> <?= htmlspecialchars($product['nombre_corto']) ?></p>
    <p><strong>Descripción:</strong> <?= htmlspecialchars($product['descripcion']) ?></p>
    <p><strong>PVP:</strong> <?= htmlspecialchars($product['pvp']) ?></p>
    <p><strong>Familia:</strong> <?= htmlspecialchars($family['nombre']) ?></p>
    <a href="list.php">Volver al listado</a>
</body>
</html>
