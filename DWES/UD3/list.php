<?php
    $connection = require_once  'connection.php';

    /**
     * Recupero la lista de productos a través de esta consulta.
     */
    $query = "SELECT * FROM productos"; 
    $productos = $connection->query($query)->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test</title>
    <style>
        #create{
            display: flex;
            margin-top: 10px;
            justify-content: center;
        }
        td {
            padding: 5px;
        }
    </style>
</head>
<body>
    <h1>Listado</h1>
    <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
    <thead>
        <tr>
            <th>Detalle</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($productos as $product): ?>
        <tr>
            <td>
            <form action="detalle.php" method="GET">
                <input type="hidden" name="id" value="<?= htmlspecialchars($product['id']) ?>">
                <button type="submit">Detalles</button>
            </form>
            </td>
            <td><?= htmlspecialchars($product['id']) ?></td>
            <td><?= htmlspecialchars($product['nombre']) ?></td>
            <td>
                <form action="edit.php" method="GET">
                    <input type="hidden" name="id" value="<?= htmlspecialchars($product['id']) ?>">
                    <button type="submit">Editar</button>
                </form>
            </td>
            <td>
                <form action="delete.php" method="GET">
                    <input type="hidden" name="id" value="<?= htmlspecialchars($product['id']) ?>">
                    <button id="eliminar" type="submit">Eliminar</button>
                </form>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<form id="create" action="create.php" meythod="GET">
    <button type="submit">CREAR NUEVO</button>
</form>
</body>
<script>
    // script para confirmación de eliminado.
    document.getElementById('eliminar').addEventListener('click', function(event) {
        var confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
        
        if (!confirmacion) {
            event.preventDefault();
        }
    });
</script>
</html>