<?php

namespace App;

use PDO;
use PDOException;

class Connection {
    private string $host;
    private string $db;
    private string $user;
    private string $password;
    private string $dsn;

    public function __construct(string $host, string $db, string $user, string $password)
    {
        $this->host = $host;
        $this->db = $db;
        $this->user = $user;
        $this->password = $password;
        $this->dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    }

    public function getConnection(): PDO {
        try{
            $connection = new PDO($this->dsn, $this->user, $this->password);
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e){
            die("Error en la conexión: " . $e->getMessage());
        }
    
        return $connection;
    }
     
}