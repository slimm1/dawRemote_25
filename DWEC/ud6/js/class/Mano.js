class Mano {

    static tope = 20;

    constructor() {
        this.cartas = [];
    }

    descartaTodas() {
        this.cartas = [];
    }

    anadirCarta(carta) {
        this.cartas.push(carta);
    }

    cuentaPuntos() {
        
        let total = 0;
        let asCount = 0;
        for(let carta of this.cartas) {
            switch(carta.valor) {
                case 'A': 
                    asCount ++;
                    break;
                case '2': total += 2; break;
                case '3': total += 3; break;
                case '4': total += 4; break;
                case '5': total += 5; break;
                case '6': total += 6; break;
                case '7': total += 7; break;
                case '8': total += 8; break;
                case '9': total += 9; break;
                case '10': total += 10; break;
                case 'J': total += 10; break;
                case 'Q': total += 10; break;
                default: total += 10; break;
            }
        }
        
        if(asCount > 0) {
            for(let i = 0; i < asCount; i++){
                if((total + 11) > 21){
                    total += 1;
                } else {
                    total += 11;
                }
            }
        }
        return total;
    }

}