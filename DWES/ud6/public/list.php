<?php 

    require_once __DIR__ . '/../vendor/autoload.php';

    use eftec\bladeone\BladeOne;

    $viewsDir = __DIR__ . "/../views";
    $cacheDir = __DIR__ . "/../cache";

    $serverUrl = 'http://localhost:8080/ud6/soap/productServer.php';
    $serverUri = 'product';

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    try {
        $client = new SoapClient(null, [
            'location' => $serverUrl,
            'uri' => $serverUri,
            'trace' => true
        ]);

        $products = $client->getAllProducts();

    } catch (SoapFault $ex) {
        echo "Error: ".$ex->getMessage();
    }

    echo $bladeOne->run('list', ['products' => $products ?? []]);