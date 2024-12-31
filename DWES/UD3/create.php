<?php
    $connection = require_once 'connection.php';

    $query = "SELECT * FROM familias";
    $familias =  $connection->query($query)->fetchAll(PDO::FETCH_ASSOC);

    // Si existen variables dentro del método POST es que se ha lanzado el formulario de creación. Con lo cual procedo a insertar los valores
    if(!empty($_POST)){
        // asigno las variables del formulario
        $nombre = $_POST['nombre'];
        $nombreCorto = $_POST['nombre_corto'];
        $descripcion = $_POST['descripcion'];
        $pvp = $_POST['pvp'];
        $familia = $_POST['familia'];

        // consulta para introducir los datos en la tabla productos. El id se asigna automáticamente.
        $query = "INSERT INTO productos (nombre, nombre_corto, descripcion, pvp, familia) VALUES (:nombre, :nombre_corto, :descripcion, :pvp, :familia)";
        $statement = $connection->prepare($query);
        $statement->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $statement->bindParam(':nombre_corto', $nombreCorto, PDO::PARAM_STR);
        $statement->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $statement->bindParam(':pvp', $pvp, PDO::PARAM_STR);
        $statement->bindParam(':familia', $familia, PDO::PARAM_STR);
        $statement->execute();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Producto</title>
    <style>
        form > div {
            margin-top: 10px;
        }

        form {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Crear Producto</h1>
    <form method="POST" action="create.php">
        <div>
            <label for="nombre">Nombre del Producto:</label>
            <input type="text" name="nombre" id="nombre" required>
        </div>
        <div>
            <label for="nombre_corto">Nombre corto:</label>
            <input type="text" name="nombre_corto" id="nombre_corto" required>
        </div>
        <div>
            <label for="descripcion">Descripción:</label>
            <input type="text" name="descripcion" id="descripcion" required>
        </div>
        <div>
            <label for="pvp">PVP:</label>
            <input type="number" name="pvp" id="pvp" required>
        </div>
        <div>
            <label for="familia">Familia:</label>
            <select name="familia" id="familia" required>
            <?php foreach ($familias as $fami): ?>
                <option value="<?= htmlspecialchars($fami['cod']) ?>">
                    <?= htmlspecialchars($fami['nombre']) ?>
                </option>
            <?php endforeach; ?>
            </select>
        </div>
        <div>
            <button type="submit">Crear</button>
        </div>
    </form>

    <a href="list.php">Volver al listado</a>
</body>
</html>
