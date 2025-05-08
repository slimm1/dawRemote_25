<?php
if (isset($_GET["id"])) {
  require_once 'conexion.php';
  $consulta = "select p.nombre as nombre, p.descripcion, f.nombre as familia from productos p JOIN familias f on p.familia = f.cod where id = '".$_GET["id"]."'";
  $sentencia = $conexion->prepare($consulta);
  try {
    $sentencia->execute();
  } catch (PDOException $ex) {
    die("Error: ".$ex->getMessage());
  }
  while ($filas = $sentencia->fetch(PDO::FETCH_OBJ)) {
?>
<ul>
  <li>Nombre: <?php echo $filas->nombre;?></li>
  <li>Descripción: <?php echo $filas->descripcion;?></li>
  <li>Familia: <?php echo $filas->familia;?></li>
</ul>
<?php
  }
}
?>
