<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle del Producto</title>
</head>
<body>
    <h1>Detalle del Producto</h1>

    <p><strong>ID:</strong> {{ htmlspecialchars($product->id) }}</p>
    <p><strong>Nombre:</strong> {{ htmlspecialchars($product->name) }}</p>
    <p><strong>Nombre corto:</strong> {{ htmlspecialchars($product->shortName) }}</p>
    <p><strong>Descripción:</strong> {{ htmlspecialchars($product->description) }}</p>
    <p><strong>PVP:</strong> {{ htmlspecialchars($product->pvp) }}</p>
    <p><strong>Familia:</strong> {{ htmlspecialchars($family->name) }}</p>

    <a href="list.php">Volver al listado</a>
</body>
</html>
