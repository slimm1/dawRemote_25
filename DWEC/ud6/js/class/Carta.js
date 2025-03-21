class Carta {

    constructor(valor, palo) {
        this.valor = valor;
        this.palo = palo;
    }

    toString() {
        return `${this.valor} de ${this.palo}`;
    }
}