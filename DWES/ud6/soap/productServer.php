<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ .'/../src/Connection.php';
require_once __DIR__ .'/../src/repository/ProductRepository.php';
require_once __DIR__ . '/../src/Entity/Product.php';

use App\Connection;
use App\Repository\ProductRepository;

$params = ['uri' => 'product'];

$connection = new Connection('localhost','proyecto', 'root', '');

try {
    $server = new SoapServer(NULL, $params);
    $server->setClass(ProductRepository::class, $connection);
    $server->handle();
} catch (SoapFault $f) {
    die("error en server: " . $f->getMessage());
}
