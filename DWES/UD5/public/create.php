<?php

    require_once __DIR__ . '/../vendor/autoload.php';

    use eftec\bladeone\BladeOne;
    use App\Entity\Product;
    use App\Connection;
    use App\Repository\FamilyRepository;
    use App\Repository\ProductRepository;

    $viewsDir = __DIR__ . "/../views";
    $cacheDir = __DIR__ . "/../cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    $connection = new Connection('localhost','proyecto', 'root', '');
    $productRepository = new ProductRepository($connection);
    $familyRepository = new FamilyRepository($connection);

    $families = $familyRepository->getAllFamilies();

    // Si existen variables dentro del método POST es que se ha lanzado el formulario de creación. Con lo cual procedo a insertar los valores
    if(!empty($_POST)){
        // asigno las variables del formulario
        $nombre = $_POST['nombre'];
        $nombreCorto = $_POST['nombre_corto'];
        $descripcion = $_POST['descripcion'];
        $pvp = $_POST['pvp'];
        $familia = $_POST['familia'];

        $product = new Product(null, $nombre, $nombreCorto, $descripcion, $pvp, $familia);

        $productRepository->createProduct($product);
    }

    echo $bladeOne->run('create', ['families' => $families]);