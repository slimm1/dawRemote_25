<?php

namespace App\Repository;

use App\Entity\Family;
use App\Connection;
use PDO;

class FamilyRepository{

    private $connection;
    public function __construct(Connection $connection) {
        $this->connection = $connection;
    }

    public function getAllFamilies(): array
    {    
        $query = "SELECT * FROM familias";
        $pdo = $this->connection->getConnection();
        return $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFamilyByCode(string $cod): Family
    {
        $query = "SELECT * FROM familias WHERE cod = :cod";
        $pdo = $this->connection->getConnection();
        $statement = $pdo->prepare($query);
        $statement->bindParam(":cod", $cod, PDO::PARAM_STR);
        $statement->execute();
        $family = $statement->fetch(PDO::FETCH_ASSOC);

        return new Family($family['cod'], $family['nombre']);
    }
}