<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Productos</title>
    <style>
        #create {
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
            @foreach ($products as $product)
            <tr>
                <td>
                    <form action="detalle.php" method="GET">
                        <input type="hidden" name="id" value="{{ htmlspecialchars($product->getId()) }}">
                        <button type="submit">Detalles</button>
                    </form>
                </td>
                <td>{{ htmlspecialchars($product->getId()) }}</td>
                <td>{{ htmlspecialchars($product->getName()) }}</td>
                <td>
                    <form action="edit.php" method="GET">
                        <input type="hidden" name="id" value="{{ htmlspecialchars($product->getId()) }}">
                        <button type="submit">Editar</button>
                    </form>
                </td>
                <td>
                    <form action="delete.php" method="GET" class="delete-form">
                        <input type="hidden" name="id" value="{{ htmlspecialchars($product->getId()) }}">
                        <button type="submit" class="eliminar">Eliminar</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    
    <form id="create" action="create.php" method="GET">
        <button type="submit">CREAR NUEVO</button>
    </form>

    <script>
        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', function(event) {
                if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                    event.preventDefault();
                }
            });
        });
    </script>
</body>
</html>
