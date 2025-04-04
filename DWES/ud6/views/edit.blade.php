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
        <input type="hidden" name="id" value="{{ htmlspecialchars($product->id) }}">

        <div>
            <label for="nombre">Nombre del Producto:</label>
            <input type="text" name="nombre" id="nombre" value="{{ htmlspecialchars($product->name) }}" required>
        </div>
        
        <div>
            <label for="nombre_corto">Nombre corto:</label>
            <input type="text" name="nombre_corto" id="nombre_corto" value="{{ htmlspecialchars($product->shortName) }}" required>
        </div>

        <div>
            <label for="descripcion">Descripción:</label>
            <input type="text" name="descripcion" id="descripcion" value="{{ htmlspecialchars($product->description) }}" required>
        </div>

        <div>
            <label for="pvp">PVP:</label>
            <input type="number" name="pvp" id="pvp" value="{{ htmlspecialchars($product->pvp) }}" required>
        </div>

        <div>
            <label for="familia">Familia:</label>
            <select name="familia" id="familia" required>
                @foreach ($families as $family)
                    <option value="{{ htmlspecialchars($family['cod']) }}" 
                        @if ($product->family == $family['cod']) selected @endif>
                        {{ htmlspecialchars($family['nombre']) }}
                    </option>
                @endforeach
            </select>
        </div>

        <div>
            <button type="submit">Actualizar</button>
        </div>
    </form>

    <a href="list.php">Volver al listado</a>
</body>
</html>
