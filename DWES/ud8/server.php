<?php
$connection = require_once 'connection.php';

// Obtener método HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener un solo producto
            $id = (int) $_GET['id'];
            $stmt = $connection->prepare("SELECT * FROM productos WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($product) {
                $stmt = $connection->prepare("SELECT nombre FROM familias WHERE cod = :cod");
                $stmt->bindParam(':cod', $product['familia']);
                $stmt->execute();
                $family = $stmt->fetch(PDO::FETCH_ASSOC);
                $product['familia_nombre'] = $family['nombre'] ?? null;
                header("HTTP/1.1 200 OK");
                echo json_encode($product);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Producto no encontrado"]);
            }
        } else {
            // Listar todos los productos
            $stmt = $connection->query("SELECT * FROM productos");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($products);
        }
        break;

        case 'POST':
            $nombre = $_POST['nombre'];
            $nombre_corto = $_POST['nombre_corto'];
            $descripcion = $_POST['descripcion'];
            $pvp = $_POST['pvp'];
            $familia = $_POST['familia'];
        
            try {
                $stmt = $connection->prepare("INSERT INTO productos (nombre, nombre_corto, descripcion, pvp, familia) VALUES (:nombre, :nombre_corto, :descripcion, :pvp, :familia)");
                $stmt->execute([
                    ':nombre' => $nombre,
                    ':nombre_corto' => $nombre_corto,
                    ':descripcion' => $descripcion,
                    ':pvp' => $pvp,
                    ':familia' => $familia
                ]);
        
                header('Location: list.html');
                exit();
            } catch (Exception $e) {
                // Manejo de errores
                echo 'Error: ' . $e->getMessage();
            }
            break;
        
    case 'PUT':
        // Actualizar un producto existente
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $connection->prepare("UPDATE productos SET nombre = :nombre, nombre_corto = :nombre_corto, descripcion = :descripcion, pvp = :pvp, familia = :familia WHERE id = :id");
        $stmt->execute([
            ':nombre' => $input['nombre'],
            ':nombre_corto' => $input['nombre_corto'],
            ':descripcion' => $input['descripcion'],
            ':pvp' => $input['pvp'],
            ':familia' => $input['familia'],
            ':id' => $input['id']
        ]);
        echo json_encode(["mensaje" => "Producto actualizado"]);
        break;

    case 'DELETE':
        try {

            // Recuperar el productId del cuerpo de la solicitud
            $input = json_decode(file_get_contents('php://input'), true);
            $productId = $input['id'];
    
            // Conectar a la base de datos y preparar la consulta para eliminar el producto
            $stmt = $connection->prepare("DELETE FROM productos WHERE id = :id");
            $stmt->execute([
                ':id' => $productId
            ]);
    
            if ($stmt->rowCount() > 0) {
                // Si el recuento de filas eliminadas es mayor que 0 devuelvo un código 200 OK
                header("HTTP/1.1 200 OK");
                echo json_encode([
                    "mensaje" => "Producto eliminado correctamente"
                ]);
            } else {
                // Si no se encontró el producto lanzo un 404
                header("HTTP/1.1 404 Not Found");
                echo json_encode([
                    "error" => "Producto no encontrado"
                ]);
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode([
                "error" => "Error al eliminar el producto",
                "detalle" => $e->getMessage()
            ]);
        }   
        break;

    default:
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
