<?php
session_start(); 

//Iniciar las variables en sesión para persistir los datos entre peticiones.
if (!isset($_SESSION['examenes'])) {
    $_SESSION['examenes'] = [];
}
if (!isset($_SESSION['tareas'])) {
    $_SESSION['tareas'] = [];
}

$examenes = $_SESSION['examenes'];
$tareas = $_SESSION['tareas'];

// Si se ha mandado el post para limpiar las notas de la página, vacío los arrays.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['clear'])) {
    $examenes = [];
    $tareas = [];
    $_SESSION['examenes'] = [];
    $_SESSION['tareas'] = [];
}

//Si se ha mandado el formulario para añadir registros, compruebo la nota y asigno valores en el array.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add'])) {
    $nota = validateMark($_POST['nota']);
    if ($nota) {
        if($_POST['selector'] === 'examen'){
            $examenes[] = $nota;
        } else {
            $tareas[] = $nota;
        }
        $_SESSION['examenes'] = $examenes;
        $_SESSION['tareas'] = $tareas;
    }
}

$avgs = getAvgs($examenes, $tareas);

// A través de esta función calculo las medias por tareas, examenes y global
function getAvgs(array $examenes, array $tareas): array
{
    $avgExam = 0;
    $countExam = 0;
    $avgTarea = 0;
    $countTarea = 0;

    foreach($examenes as $examen){
        $avgExam += $examen;
        $countExam++;
    }
    
    foreach($tareas as $tarea){
        $avgTarea += $tarea;
        $countTarea++;
    }

    $avgExam = $countExam > 0 ? $avgExam/$countExam : 0;
    $avgTarea = $countTarea > 0 ? $avgTarea/$countTarea : 0;
    $global = ($avgExam * 0.7) + ($avgTarea * 0.3);

    return ['examenes' => $avgExam, 'tareas' => $avgTarea, 'global' => $global];
} 


// funcion para validar la nota
function validateMark($mark): ?int {
    if($mark !== ''){
        if(intval($mark) > 0 && intval($mark) <=10){
            return $mark;
        }
    }
    return null;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notas</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Code+Latin:wght@100..700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="header">
        <h1>Calculadora de media</h1>
    </div>
    <div class="form-container">
        <form action="" method="post">
            <div class="form-row">
                <label for="selector">Tipo de registro: </label>
                <select name="selector" id="selector">
                    <option value="tarea">Tarea</option>
                    <option value="examen">Examen</option>
                </select>
            </div>
            <div class="form-row">
                <label for="nota">Introduce la nota:</label>
                <input type="text" name="nota" id="nota">
            </div>
            <div class="button">
                <button type="submit" name="add">ENVIAR</button>
            </div>
        </form>
    </div>

    <div class="info-container">
        <div class="marks-panel">
            <h1>Notas almacenadas</h1>
            <?php
            // Muestra las notas introducidas en los arrays:
            if (empty($examenes) && empty($tareas)) {
                echo "<p>No hay notas almacenadas.</p>";
            } else {
                foreach ($examenes as $nota) {
                    echo "<p>Tipo: Examen - Nota: {$nota}</p>";
                }
                foreach ($tareas as $nota) {
                    echo "<p>Tipo: Tarea - Nota: {$nota}</p>";
                }
            }
            ?>
        </div>
        <div class="avg-panel">
        <!-- Muestro los resultados de la funcion getAvgs() en estos elementos -->
            <p><strong>Nota media de las tareas:</strong> <?php echo number_format($avgs['tareas'], 2) ?></p>
            <p><strong>Nota media de los exámenes:</strong> <?php echo number_format($avgs['examenes'], 2) ?></p>
            <p><strong>Nota media global:</strong> <?php echo number_format($avgs['global'], 2) ?></p>
        </div>
        <form action="" method="post">
            <div class="button">
                <button type="submit" name="clear">CLEAR</button>
            </div>
        </form>
    </div>
</body>
</html>
