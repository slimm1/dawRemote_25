<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Listado</title>
    <style type="text/css">
      td:hover { 
        background-color: yellow;
        cursor: pointer; 
      }
    </style>
    <script type="text/javascript">
      var objXMLHttpRequest = new XMLHttpRequest();

      objXMLHttpRequest.onreadystatechange = function() {
        if(objXMLHttpRequest.readyState === 4) {
          if(objXMLHttpRequest.status === 200) {
            myp.innerHTML = objXMLHttpRequest.responseText;
          } else {
            alert('Error Code: ' +  objXMLHttpRequest.status);
            alert('Error Message: ' + objXMLHttpRequest.statusText);
          }
        }
      }

      function f(id) {
        objXMLHttpRequest.open('GET', `datos.php?id=${id}`);
        objXMLHttpRequest.send();
      }
    </script>
  </head>
  <body>
    <h1>Listado</h1>
    <table border="1">
      <tr>
        <th>ID</th>
      </tr>
<?php
require_once 'conexion.php';
$consulta = "select * from productos";
$sentencia = $conexion->prepare($consulta);
try {
  $sentencia->execute();
} catch (PDOException $ex) {
  die("Error: ".$ex->getMessage());
}
while ($filas = $sentencia->fetch(PDO::FETCH_OBJ)) {
?>
      <tr>
        <td onclick="f('<?php echo $filas->id;?>');"><?php echo $filas->id;?></td>
      </tr>
<?php
}
$sentencia = null;
$conexion = null;
?>
    </table>
    <h1>Detalle</h1>
    <p id="myp">Selecciona un registro</p>
  </body>
</html>
