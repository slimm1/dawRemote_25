<?php

namespace App\Entity;

class Product {

    private ?int $id;
    private string $name;
    private string $shortName;
    private string $description;
    private int $pvp;
    private string $family;

    public function __construct(?int $id, string $name, string $shortName, string $description, int $pvp, string $family)
    {
        $this->id = $id;
        $this->name = $name;
        $this->shortName = $shortName;
        $this->description = $description;
        $this->pvp = $pvp;
        $this->family = $family;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getShortName(): string
    {
        return $this->shortName;
    }

    public function setShortName(string $shortName): void
    {
        $this->shortName = $shortName;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getPvp(): int
    {
        return $this->pvp;
    }

    public function setPvp(int $pvp): void
    {
        $this->pvp = $pvp;
    }

    public function getFamily(): string
    {
        return $this->family;
    }

    public function setFamily(string $family): void
    {
        $this->family = $family;
    }
}
    
