<?php 

    use eftec\bladeone\BladeOne;
    use Src\Connection;
    use Src\Repository\ProductRepository;

    $viewsDir = __DIR__ . "/views";
    $cacheDir = __DIR__ . "/cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    $connection = new Connection('localhost','proyecto', 'root', '');
    $productRepository = new ProductRepository( $connection);
    
    $products = $productRepository->getAllProducts();

    $bladeOne->run('list', ['products' => $products]);