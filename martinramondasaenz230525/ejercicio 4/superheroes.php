<?php
// superheroes.php
// Este archivo contiene un array asociativo con información de superhéroes
$superheroes = [
    "spiderman" => [
        "nombre" => "Spiderman",
        "fuerza" => 85,
        "agilidad" => 95,
        "inteligencia" => 90,
        "imagen" => "img/spiderman.jpg"
    ],
    "drstrange" => [
        "nombre" => "Doctor Strange",
        "fuerza" => 70,
        "agilidad" => 60,
        "inteligencia" => 100,
        "imagen" => "img/drstrange.jpg"
    ],
    "hulk" => [
        "nombre" => "Hulk",
        "fuerza" => 100,
        "agilidad" => 40,
        "inteligencia" => 70,
        "imagen" => "img/hulk.jpg"
    ],
    "ironman" => [
        "nombre" => "Iron Man",
        "fuerza" => 85,
        "agilidad" => 80,
        "inteligencia" => 95,
        "imagen" => "img/ironman.jpg"
    ],
    "thor" => [
        "nombre" => "Thor",
        "fuerza" => 95,
        "agilidad" => 70,
        "inteligencia" => 80,
        "imagen" => "img/thor.jpg"
    ]
];

// Obtener el parámetro de la petición GET
$param = isset($_GET['nombre']) ? strtolower($_GET['nombre']) : null;

// Validar si el parámetro existe en los datos
if ($param && array_key_exists($param, $superheroes)) {
    // Devolver los datos del superhéroe en formato JSON
    header('Content-Type: application/json');
    echo json_encode($superheroes[$param]);
} else {
    // Respuesta en caso de que no se encuentre el superhéroe
    header('Content-Type: application/json');
    echo json_encode($superheroes);
}
?>