<?php

namespace App;

use SoapServer;
use SoapFault;

class Server {
    private string $targetClass;
    private array $params;

    public function __construct(string $targetClass, array $params) {
        $this->targetClass = $targetClass;
        $this->params = $params;
    }

    public function initServer(): void {
        try {
            $server = new SoapServer(NULL, $this->params);
            $server->setClass($this->targetClass);
            $server->handle();
        } catch (SoapFault $f) {
            die("error en server: " . $f->getMessage());
        }
    }
}

