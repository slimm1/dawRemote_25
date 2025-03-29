<?php

    require_once __DIR__ . '/../vendor/autoload.php';

    use eftec\bladeone\BladeOne;
    use App\Connection;
    use App\Repository\FamilyRepository;
    use App\Repository\ProductRepository;

    $viewsDir = __DIR__ . "/../views";
    $cacheDir = __DIR__ . "/../cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    $connection = new Connection('localhost','proyecto', 'root', '');
    $productRepository = new ProductRepository($connection);
    $familyRepository = new FamilyRepository($connection);

    if(!empty($_GET)){
        $id = $_GET['id'];

        // se recuperan la información de base de datos
        $product = $productRepository->getProductById( $id );
        $families = $familyRepository->getAllFamilies();

        echo $bladeOne->run('edit', [
            'product' => $product,
            'families' => $families
        ]);

    }

    // Si se llama al script por POST es que se va a editar el objeto producto en base de datos.
    if(!empty($_POST)){
        
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $nombreCorto = $_POST['nombre_corto'];
        $descripcion = $_POST['descripcion'];
        $pvp = $_POST['pvp'];
        $familia = $_POST['familia'];

        $productRepository->updateProduct($id, $nombre, $nombreCorto, $descripcion, $pvp, $familia);
        
        // recargo la misma página con el id, de manera que accede al script por el método GET.
        header('Location: edit.php?id=' . $id);
        exit();
    }