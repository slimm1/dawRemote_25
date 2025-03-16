class Mazo {

    constructor() {
        this.cartas = [];
        this.numCartas = 52;
    }

    baraja() {
        for(let i = 0; i < this.numCartas; i++){
            carta = new Carta();
        }
    }

    getNumCartas() {
        return this.numCartas;
    }

    daCarta() {
        return this.cartas.shift();
    }
}