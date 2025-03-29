<?php

namespace App\Repository;

use App\Connection;
use App\Entity\Product;
use PDO;

class ProductRepository {

    private Connection $connection;

    public function __construct(Connection $connection) 
    {
        $this->connection = $connection;
    }

    public function getAllProducts(): array
    {    
        $query = "SELECT * FROM productos";
        $pdo = $this->connection->getConnection();
        $products = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
        return array_map(function ($row) {
            return new Product(
                $row['id'],
                $row['nombre'],
                $row['nombre_corto'],
                $row['descripcion'],
                $row['pvp'],
                $row['familia']
            );
        }, $products);
    }

    public function getProductById(int $id): Product
    {
        $query = "SELECT * FROM productos WHERE id = :id";
        $pdo = $this->connection->getConnection();
        $statement = $pdo->prepare($query);
        $statement->bindParam(":id", $id, PDO::PARAM_INT);
        $statement->execute();
        $product = $statement->fetch(PDO::FETCH_ASSOC);
        return new Product($product["id"], $product["nombre"], $product["nombre_corto"], $product["descripcion"], $product["pvp"], $product["familia"]);
    }

    public function createProduct(Product $product): void
    {
        $query = "INSERT INTO productos (nombre, nombre_corto, descripcion, pvp, familia) VALUES (:nombre, :nombre_corto, :descripcion, :pvp, :familia)";
        $pdo = $this->connection->getConnection();
        
        $name = $product->getName();
        $shortName = $product->getShortName();
        $description = $product->getDescription();
        $pvp = $product->getPvp();
        $family = $product->getFamily();
        
        $statement = $pdo->prepare($query);
        $statement->bindParam(':nombre', $name, PDO::PARAM_STR);
        $statement->bindParam(':nombre_corto', $shortName, PDO::PARAM_STR);
        $statement->bindParam(':descripcion', $description, PDO::PARAM_STR);
        $statement->bindParam(':pvp', $pvp, PDO::PARAM_STR);
        $statement->bindParam(':familia', $family, PDO::PARAM_STR);
        $statement->execute();
    }

    public function updateProduct(int $productId, string $name, string $shortName, string $description, string $pvp, string $family): void
    {
        $query = "UPDATE productos SET nombre = :nombre, nombre_corto = :nombre_corto, descripcion = :descripcion, pvp = :pvp, familia = :familia WHERE id = :productId";        
        $pdo = $this->connection->getConnection();

        $statement = $pdo->prepare($query);
        $statement->bindParam(':nombre', $name, PDO::PARAM_STR);
        $statement->bindParam(':nombre_corto', $shortName, PDO::PARAM_STR);
        $statement->bindParam(':descripcion', $description, PDO::PARAM_STR);
        $statement->bindParam(':pvp', $pvp, PDO::PARAM_STR);
        $statement->bindParam(':familia', $family, PDO::PARAM_STR);
        $statement->bindParam(':productId', $productId, PDO::PARAM_INT);

        $statement->execute();
    }

    public function removeProduct(int $id): void
    {
        $query = "DELETE FROM productos WHERE id = :id";
        $pdo = $this->connection->getConnection();
        $statement = $pdo->prepare($query);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);
        $statement->execute();
    }
}