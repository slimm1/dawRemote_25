<?php
// En este fichero recupero los datos de la base de datos y los preparo para devolverlos a cualquier recurso que los solicite.
// Iniciar la conexión a base de datos:
$connection = require_once 'connection.php';

// Si el parámetro id no se ha recibido por GET, se devuelve un mensaje de error.
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID no proporcionado']);
    exit;
}

// parsear el id recibido por GET a un integer
$id = (int) $_GET['id'];

// Se prepara la consulta y se recupera el producto solicitado:
$query = "SELECT * FROM productos WHERE id = :id";
$statement = $connection->prepare($query);
$statement->bindParam(':id', $id, PDO::PARAM_INT);
$statement->execute();
$product = $statement->fetch(PDO::FETCH_ASSOC);

// Si no hay producot, se devuelve un mensaje de error:
if (!$product) {
    echo json_encode(['error' => 'Producto no encontrado']);
    exit;
}

// Se recupera la famlia asociada al producto que acabo de recuperar
$query = "SELECT nombre FROM familias WHERE cod = :cod";
$statement = $connection->prepare($query);
$statement->bindParam(':cod', $product['familia'], PDO::PARAM_STR);
$statement->execute();
$family =  $statement->fetch(PDO::FETCH_ASSOC);

$product['familia_nombre'] = $family['nombre'] ?? '';

// Se devuelve la respuesta final codificada en formato JSON:
echo json_encode($product);