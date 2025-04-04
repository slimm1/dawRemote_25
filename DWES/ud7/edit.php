<?php
    $connection = require_once 'connection.php';
    /**
     * Si se llama a este script con GET es para cargar los datos de un producto y editarlos. 
     */
    if(!empty($_GET)){
        $id = $_GET['id'];
        // se carga la información del producto cuyo id coincida con el enviado a través de GET
        $query = "SELECT * FROM productos WHERE id = :id";
        $statement = $connection->prepare($query);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);
        $statement->execute();
        $product = $statement->fetch(PDO::FETCH_ASSOC);
        
        // Se recupera la lista de familias para cargarlas en el selector.
        $query = "SELECT * FROM familias";
        $familias =  $connection->query($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Si se llama al script por POST es que se va a editar el objeto producto en base de datos.
    if(!empty($_POST)){
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $nombreCorto = $_POST['nombre_corto'];
        $descripcion = $_POST['descripcion'];
        $pvp = $_POST['pvp'];
        $familia = $_POST['familia'];

        //se persiste la información actualizada en base de datos.
        $query = "UPDATE productos SET nombre = :nombre, nombre_corto = :nombre_corto, descripcion = :descripcion, pvp = :pvp, familia = :familia WHERE id = :id";        
        $statement = $connection->prepare($query);
        $statement->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $statement->bindParam(':nombre_corto', $nombreCorto, PDO::PARAM_STR);
        $statement->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $statement->bindParam(':pvp', $pvp, PDO::PARAM_STR);
        $statement->bindParam(':familia', $familia, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);
        $statement->execute();
        // recargo la misma página con el id, de manera que accede al script por el método GET.
        header('Location: edit.php?id=' . $id);
        exit();
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto</title>
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
    <h1>Editar Producto</h1>
    <form method="POST" action="edit.php">
        <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">
        <div>
            <label for="nombre">Nombre del Producto:</label>
            <input type="text" name="nombre" id="nombre" value="<?= htmlspecialchars($product['nombre']) ?>" required>
        </div>
        <div>
            <label for="nombre_corto">Nombre corto:</label>
            <input type="text" name="nombre_corto" id="nombre_corto" value="<?= htmlspecialchars($product['nombre_corto']) ?>"  required>
        </div>
        <div>
            <label for="descripcion">Descripción:</label>
            <input type="text" name="descripcion" id="descripcion" value="<?= htmlspecialchars($product['descripcion']) ?>"  required>
        </div>
        <div>
            <label for="pvp">PVP:</label>
            <input type="number" name="pvp" id="pvp" value="<?= htmlspecialchars($product['pvp']) ?>"  required>
        </div>
        <div>
            <label for="familia">Familia:</label>
            <select name="familia" id="familia" required>
            <?php foreach ($familias as $fami): ?>
                <option value="<?= htmlspecialchars($fami['cod']) ?>"
                <?php if ($product['familia'] == $fami['cod']): ?>
                    selected
                <?php endif; ?>>
                    <?= htmlspecialchars($fami['nombre']) ?>
                </option>
            <?php endforeach; ?>
            </select>
        </div>
        <div>
            <button type="submit">Actualizar</button>
        </div>
    </form>

    <a href="list.php">Volver al listado</a>
</body>
</html>
