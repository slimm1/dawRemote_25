<?php
    // inciar sesión.
    session_start();
    // Inicio las variables con su valor por defecto.
    $lang = 'No establecido';
    $publicProfile = 'No establecido';
    $timeZone = 'No establecido';
    // Si carga la página a través del formulario:
    if(!empty($_POST)){
        // Cierro sesión e inicio la variable message para mostrarla.
        session_destroy();
        $message = 'Preferencias Borradas.';
    }
    // Si existen registros en sesión:
    if(!empty($_SESSION)){
        // Inicio las variables con los valores de sesión para mostrarlos en el documento
        $lang = $_SESSION['lang'] === 'es' ? 'Español' : 'Inglés';
        $publicProfile = $_SESSION['public-profile'] ? 'Sí' : 'No';
        $timeZone = $_SESSION['time-zone'];
    }
?>
<html lang="ES">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver preferencias de usuario</title>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
<form action="" method="post">
    <?php 
        // si la variable message está inicializada, muestro su contenido.
        if(isset($message)){
            echo '<p id="alert">' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
        }
    ?>
    <p>Idioma seleccionado: <?php echo htmlspecialchars($lang) ?></p>
    <p>Perfil público: <?php echo htmlspecialchars($publicProfile) ?></p>
    <p>Zona horaria: <?php echo htmlspecialchars($timeZone) ?></p>
    <button name="delete" type="submit">Borrar</button>
    <a href="preferencias.php">Establecer</a>
</form>


</body>
</html>