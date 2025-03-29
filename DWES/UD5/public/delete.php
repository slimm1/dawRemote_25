<?php 

    require_once __DIR__ . '/../vendor/autoload.php';

    use eftec\bladeone\BladeOne;
    use App\Connection;
    use App\Repository\ProductRepository;

    $viewsDir = __DIR__ . "/../views";
    $cacheDir = __DIR__ . "/../cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    $connection = new Connection('localhost','proyecto', 'root', '');
    $productRepository = new ProductRepository( $connection);

    $id = $_GET['id'];

    $productRepository->removeProduct($id);

    header("Location: list.php");
    exit();
