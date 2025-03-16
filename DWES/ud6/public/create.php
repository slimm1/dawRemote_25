<?php
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../src/entity/Product.php';

    use eftec\bladeone\BladeOne;
    use App\Entity\Product;

    $viewsDir = __DIR__ . "/../views";
    $cacheDir = __DIR__ . "/../cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    try {
        
        //cliente para el server de productos
        $productClient = new SoapClient(null, [
            'location' => 'http://localhost:8080/ud6/soap/productServer.php',
            'uri' => 'product',
            'trace' => true
        ]);

        // cliente para el server de familias
        $familyClient = new SoapClient(null, [
            'location' => 'http://localhost:8080/ud6/soap/familyServer.php',
            'uri' => 'family',
            'trace' => true
        ]);

        // En la práctica anterior este método me devolvía un array de objetos Famly pero el servidor SOAP los trata como stdClass. En este caso, he modificado
        // el método del repositorio para que me devuelva un array de arrays.
        $families = $familyClient->getAllFamilies();

    } catch (SoapFault $ex) {
        echo "Error: ".$ex->getMessage();
    }

    // Si existen variables dentro del método POST es que se ha lanzado el formulario de creación. Con lo cual procedo a insertar los valores
    if(!empty($_POST)){
        // asigno las variables del formulario
        $nombre = $_POST['nombre'];
        $nombreCorto = $_POST['nombre_corto'];
        $descripcion = $_POST['descripcion'];
        $pvp = $_POST['pvp'];
        $familia = $_POST['familia'];

        $product = new Product(null, $nombre, $nombreCorto, $descripcion, $pvp, $familia);

        // Aunque he instanciado un objeto Product, el servidor SOAP recoge el argumento como un stdClass
        $productClient->createProduct($product);
    }

    echo $bladeOne->run('create', ['families' => $families]);