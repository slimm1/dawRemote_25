<?php 
    require_once __DIR__ . '/../vendor/autoload.php';

    use eftec\bladeone\BladeOne;

    $viewsDir = __DIR__ . "/../views";
    $cacheDir = __DIR__ . "/../cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    $id = $_GET['id'];

    try {
        $client = new SoapClient(null, [
            'location' => 'http://localhost:8080/ud6/soap/productServer.php',
            'uri' => 'product',
            'trace' => true
        ]);

        $client->removeProduct($id);

    } catch (SoapFault $ex) {
        echo "Error: ".$ex->getMessage();
    }

    header("Location: list.php");
    exit();
