<?php

    require_once __DIR__ . '/../vendor/autoload.php';

    use eftec\bladeone\BladeOne;

    $viewsDir = __DIR__ . "/../views";
    $cacheDir = __DIR__ . "/../cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    try {
        
        $productClient = new SoapClient(null, [
            'location' => 'http://localhost:8080/ud6/soap/productServer.php',
            'uri' => 'product',
            'trace' => true
        ]);

        $familyClient = new SoapClient(null, [
            'location' => 'http://localhost:8080/ud6/soap/familyServer.php',
            'uri' => 'family',
            'trace' => true
        ]);

    } catch (SoapFault $ex) {
        echo "Error: ".$ex->getMessage();
    }

    $id = $_GET['id'];
    $product = $productClient->getProductById($id);
    $family = $familyClient->getFamilyByCode($product->family);

    echo $bladeOne->run('detalle', [
        'product' => $product,
        'family' => $family,
    ]);