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
                @foreach ($families as $family)
                    <option value="{{ htmlspecialchars($family->getCode()) }}">
                        {{ htmlspecialchars($family->getName()) }}
                    </option>
                @endforeach
            </select>
        </div>
        <div>
            <button type="submit">Crear</button>
        </div>
    </form>

    <a href="list.php">Volver al listado</a>
</body>
</html>
