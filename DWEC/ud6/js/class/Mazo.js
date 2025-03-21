class Mazo {

    valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    constructor() {
        this.cartas = [];
        this.numCartas = 52;
        this.baraja();
    }

    baraja() {

        // Iniciar la lista ordenada iterando por los Palos y los valores
        for (let palo of Palo.getAll()) {
            for (let valor of this.valores) {
                this.cartas.push(new Carta(valor, palo));
            }
        }

        // Desoedenar el array cartas
        for (let i = this.cartas.length - 1; i > 0; i--) {
            // Valor random entre 0 y el valor de la iteración del bucle
            let rnd = Math.floor(Math.random() * (i + 1));
            // uso de desestructuración para intercambiar los valores del array
            [this.cartas[i], this.cartas[rnd]] = [this.cartas[rnd], this.cartas[i]];
        }

    }

    getNumCartas() {
        return this.numCartas;
    }

    daCarta() {
        return this.cartas.shift();
    }
}