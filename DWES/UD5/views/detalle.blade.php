<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle del Producto</title>
</head>
<body>
    <h1>Detalle del Producto</h1>

    <p><strong>ID:</strong> {{ htmlspecialchars($product->getId()) }}</p>
    <p><strong>Nombre:</strong> {{ htmlspecialchars($product->getName()) }}</p>
    <p><strong>Nombre corto:</strong> {{ htmlspecialchars($product->getShortName()) }}</p>
    <p><strong>Descripción:</strong> {{ htmlspecialchars($product->getDescription()) }}</p>
    <p><strong>PVP:</strong> {{ htmlspecialchars($product->getPvp()) }}</p>
    <p><strong>Familia:</strong> {{ htmlspecialchars($family->getName()) }}</p>

    <a href="list.php">Volver al listado</a>
</body>
</html>
