<?php

namespace App\Repository;

use App\Connection;
use App\Entity\Family;
use PDO;

class FamilyRepository {

    private Connection $connection;

    public function __construct(Connection $connection) 
    {
        $this->connection = $connection;
    }

    public function getAllFamilies(): array
    {    
        $query = "SELECT * FROM familias";
        $pdo = $this->connection->getConnection();
        $families = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
        return array_map(function($row) {
            return new Family(
                $row['cod'],
                $row['nombre']
            );
        }, $families);
    }

    public function getFamilyByCode(string $code): Family
    {
        $query = "SELECT * FROM familias WHERE cod = :cod";
        $pdo = $this->connection->getConnection();
        $statement = $pdo->prepare($query);
        $statement->bindParam(":cod", $code, PDO::PARAM_STR);
        $statement->execute();
        $family = $statement->fetch(PDO::FETCH_ASSOC);
        return new Family($family['cod'], $family['nombre']);
    }
}