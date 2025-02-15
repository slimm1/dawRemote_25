<?php
// Inicio sesión y las variables.
    session_start();
    $lang = null;
    $publicProfile = null;
    $timeZone = null;
    // Si se ha enviado el formulario:
    if(!empty($_POST)){
        // Inicio las variables y las establezco en $_SESSION
        $lang = $_POST['lang'];
        $publicProfile = (bool) $_POST['public-profile'];
        $timeZone = $_POST['time-zone'];
        
        $_SESSION['lang'] = $lang;
        $_SESSION['public-profile'] = $publicProfile;
        $_SESSION['time-zone'] = $timeZone;
        // también inicializo la variable message para mostrarla en el formulario.
        $message = 'Preferencia de usuario guardadas';
    }
    // Si ya existen registros en sesión, asigno la información de la sesión a mis variables
    if(!empty($_SESSION)){
        $lang = $_SESSION['lang'];
        $publicProfile = $_SESSION['public-profile'];
        $timeZone = $_SESSION['time-zone'];
    }
?>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preferencias del usuario</title>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
<form action="" method="post">
    <?php 
        // muestro el mensaje si está seteado
        if(isset($message)){
            echo '<p id="alert">' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
        } 
    ?>
    <label for="lang">Idioma:</label>
    <select id="lang" name="lang">
        <!-- Si el valor de la variable coincide con el value del option, se marca como seleciconado -->
        <option value="es" <?php echo ($lang === 'es') ? 'selected' : '' ?>>Español</option>
        <option value="en" <?php echo ($lang === 'en') ? 'selected' : '' ?>>Inglés</option>
    </select>
    <br>
    
    <label for="public-profile">Perfil público:</label>
    <select id="public-profile" name="public-profile">
        <option value="true" <?php echo $publicProfile ? 'selected' : '' ?>>Sí</option>
        <option value="false" <?php echo !$publicProfile ? 'selected' : '' ?>>No</option>
    </select>
    <br>
    
    <label for="time-zone">Zona horaria:</label>
    <select id="time-zone" name="time-zone">
        <option value="GMT-2" <?php echo ($timeZone === 'GMT-2') ? 'selected' : '' ?>>GMT-2</option>
        <option value="GMT-1" <?php echo ($timeZone === 'GMT-1') ? 'selected' : '' ?>>GMT-1</option>
        <option value="GMT" <?php echo ($timeZone === 'GMT') ? 'selected' : '' ?>>GMT</option>
        <option value="GMT+1" <?php echo ($timeZone === 'GMT+1') ? 'selected' : '' ?>>GMT+1</option>
        <option value="GMT+2" <?php echo ($timeZone === 'GMT+2') ? 'selected' : '' ?>>GMT+2</option>
    </select>
    <br>
    
    <button type="submit">Establecer preferencias</button>
    <br>
    
    <a href="mostrar.php">Mostrar preferencias</a>
</form>
</body>
</html>