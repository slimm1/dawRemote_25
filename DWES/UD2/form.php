<?php
// Inicializar el array para almacenar los datos si no existe
session_start(); // Usamos la sesión para mantener los datos si se envían múltiples formularios

if (!isset($_SESSION['notas'])) {
    $_SESSION['notas'] = []; // Array para almacenar las notas
}

// Recoger los valores del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tipo = $_POST['selector'] ?? ''; // tipo de tarea, puede ser "tarea" o "examen"
    $nota = $_POST['nota'] ?? ''; // la nota ingresada

    // Verificar que los valores no estén vacíos
    if (!empty($tipo) && !empty($nota)) {
        // Almacenar los datos en el array de la sesión
        $_SESSION['notas'][] = [
            'tipo' => $tipo,
            'nota' => $nota
        ];
    }
}

// Mostrar el contenido del array
echo "<h1>Notas almacenadas:</h1>";
if (!empty($_SESSION['notas'])) {
    foreach ($_SESSION['notas'] as $nota) {
        echo "<p>Tipo: {$nota['tipo']} - Nota: {$nota['nota']}</p>";
    }
} else {
    echo "<p>No hay notas almacenadas.</p>";
}
?>