<?php

/**
 * He querido mantener la misma estructura que en la práctica anterior, con la clase Conexión y los repositorios. Para ello he creado dos scripts de servidor soap, uno para cada
 * Repositorio (que son mis fuentes de datos). 
 * El script comienza creando una instancia de mi clase Connection, que devuelve el PDO y es necesaria para que funcione mi Repositorio. Esta instancia se pasa como
 * argumento adicional al método setClass, que se encarga de construir el Repositorio.
 * He podido observar que el servidor SOAP no trata los objetos como yo los he nombrado, sino como stdClass o array. Esto me ha supuesto cierta complicación, y he tenido que
 * adaptar los métodos de mis repositorios y también las plantillas de BladeOne a arrays o stdClass.
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ .'/../src/Connection.php';
require_once __DIR__ .'/../src/entity/Family.php';
require_once __DIR__ .'/../src/repository/FamilyRepository.php';

use App\Connection;
use App\Repository\FamilyRepository;

$connection = new Connection('localhost','proyecto', 'root', '');
$params = ['uri' => 'family'];

try {
    $server = new SoapServer(NULL, $params);
    $server->setClass(FamilyRepository::class, $connection);
    $server->handle();
} catch (SoapFault $f) {
    die("error en server: " . $f->getMessage());
}
