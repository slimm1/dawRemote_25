<?php

namespace App\Entity;

class Family {
    private string $cod;
    private string $name;

    public function __construct(string $cod, string $name)
    {
        $this->cod = $cod;
        $this->name = $name;
    }

    public function getCode(): string
    {
        return $this->cod;
    }

    public function setCode(string $cod): void
    {
        $this->cod = $cod;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }
}