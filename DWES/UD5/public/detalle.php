<?php

    use eftec\bladeone\BladeOne;
    use Src\Connection;
    use Src\Repository\FamilyRepository;
    use Src\Repository\ProductRepository;

    $viewsDir = __DIR__ . "/views";
    $cacheDir = __DIR__ . "/cache";

    $bladeOne = new BladeOne($viewsDir, $cacheDir, BladeOne::MODE_AUTO);

    $connection = new Connection('localhost','proyecto', 'root', '');
    $productRepository = new ProductRepository($connection);
    $familyRepository = new FamilyRepository($connection);


    $id = $_GET['id'];
    $product = $productRepository->getProductById($id);
    $family = $familyRepository->getFamilyByCode($product->getFamily());
        
    $bladeOne->run('detalle', [
        'product' => $product,
        'family' => $family,
    ]);