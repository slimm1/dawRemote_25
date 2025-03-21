let mazo = null;
let mano = null; 

// añadir eventos a los botones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('new-game');
    const endGameButton = document.getElementById('end-game');
    const getCardButton = document.getElementById('get-card');

    newGameButton.addEventListener('click', () => startNewGame());
    getCardButton.addEventListener('click', () => giveCard());
    endGameButton.addEventListener('click', () => plantarse());
});

// función para iniciar el juego.
function startNewGame() {
    // reiniciar la mesa
    resetTable();
    const currentBalanceElement = document.getElementById('current-balance').querySelector('span');
    const betElement = document.getElementById('current-bet').querySelector('span');
    
    let currentBalance = currentBalanceElement.innerText;
    currentBalance = Number(currentBalance.substring(0, currentBalance.indexOf('€')));
    
    // recojo la apuesta que va a realizar el jugador
    let bet = prompt('Introduce la cantidad que deseas apostar:');
    bet = validateBet(bet, currentBalance);

    if(!bet){
        return;
    }

    // activar botones para pedir carta o plantarse
    handleButtons(false);

    currentBalanceElement.innerText = (currentBalance - bet) + '€';
    betElement.innerText = bet + '€';

    // Iniciar una nueva mano, y el mazo si no está iniciado
    mano = new Mano();
    if(!mazo){
        mazo = new Mazo();
        giveCard();
        giveCard();
    }
}

// Funcion para dar cartas. Maneja también la renderización de los elementos carta.
function giveCard() {
    // extraer la carta del mazo y añadirla a la mano del jugador.
    const card = mazo.daCarta();
    mano.anadirCarta(card);
    // extraer las dimensiones para renderizar la carta del sprite.
    const width = getSpriteWidth(card.valor);
    const heigth = getSpriteHeigth(card.palo);

    // renderizar la carta 
    const playerCardsDisplay = document.querySelector('.player .cards-display');
    const newCard = document.createElement('div');
    newCard.classList.add('game-card');
    newCard.style.backgroundImage = `url(assets/cartas.png)`;
    newCard.style.backgroundPosition = `-${width}px -${heigth}px`;
    playerCardsDisplay.append(newCard);
    playerCardsDisplay.style.display = 'flex';

    // mostrar la puntuación obtenida
    const playerScoreElement = document.getElementById('player-score').querySelector('span');
    playerScoreElement.innerText = mano.cuentaPuntos();

    // Si al pedir carta te pasas de 21, has perdido.
    if(mano.cuentaPuntos() > 21){
        alert('HAS PERDIDO');
        handleButtons(true);
    }
}

// Determina la altura del sprite en función del palo
function getSpriteHeigth(palo) {
    switch (palo) {
        case 'diamantes': return 288;
        case 'treboles': return 192;
        case 'corazones': return 96;
        default: return 0;
    }
}

// Determina el ancho del sprite en función del valor de la carta
function getSpriteWidth(valor) {
    const base = 71;
    switch(valor) {
        case 'A': return 0 * base;
        case '2': return 1 * base;
        case '3': return 2 * base;
        case '4': return 3 * base;
        case '5': return 4 * base;
        case '6': return 5 * base;
        case '7': return 6 * base;
        case '8': return 7 * base;
        case '9': return 8 * base;
        case '10': return 9 * base;
        case 'J': return 10 * base;
        case 'Q': return 11 * base;
        default: return 12 * base;
    }
}

// Valida que la apuesta sea un valor numérico dentro de los valores permitidos
function validateBet(bet, currentBalance){
    bet = Number(bet);

    if(isNaN(bet)){
        alert('Debes introducir un número válido');
        return null;
    }

    if(bet > currentBalance){
        alert('¡No tienes tanto dinero!');
        return null;
    }

    if(bet <= 0){
        alert('La apuesta debe ser mayor que 0€');
        return null;
    }

    return bet;
} 

// Activa o desactiva los botones
function handleButtons(newGame) {
    const buttons = document.querySelectorAll('button');
    for(let i = 0; i < buttons.length; i++){
        if(i == 0){
            buttons[i].disabled = !newGame;
            continue;
        }
        buttons[i].disabled = newGame;
    }
}

// reinicia la mesa, la mano y la baraja
function resetTable() {
    const playerScoreElement = document.getElementById('player-score').querySelector('span');
    const crupierScoreElement = document.getElementById('crupier-score').querySelector('span');
    const playerCardsDisplay = document.querySelector('.player .cards-display');
    const crupierCardsDisplay = document.querySelector('.crupier .cards-display');
    const betElement = document.getElementById('current-bet').querySelector('span');

    playerCardsDisplay.innerHTML = '';
    playerCardsDisplay.style = 'none';
    crupierCardsDisplay.innerHTML = '';
    crupierCardsDisplay.style = 'none';

    playerScoreElement.innerText = 0;
    crupierScoreElement.innerText = 0;
    betElement.innerText = '0€';
    mano = null;
    mazo = null;
}

function plantarse() {
    const crupierScoreElement = document.getElementById('crupier-score').querySelector('span');
    const currentBalanceElement = document.getElementById('current-balance').querySelector('span');
    const betElement = document.getElementById('current-bet').querySelector('span');
    // iniciar una nueva mano para el crupier
    const manoCrupier = new Mano();

    // mientras el valor de la mano del crupier sea menor de 17, se siguen sacando cartas
    while(manoCrupier.cuentaPuntos() < 17){
        const card = mazo.daCarta();
        manoCrupier.anadirCarta(card);
        const width = getSpriteWidth(card.valor);
        const heigth = getSpriteHeigth(card.palo);

        const crupierCardsDisplay = document.querySelector('.crupier .cards-display');
        const newCard = document.createElement('div');
        newCard.classList.add('game-card');
        newCard.style.backgroundImage = `url(assets/cartas.png)`;
        newCard.style.backgroundPosition = `-${width}px -${heigth}px`;
        crupierCardsDisplay.append(newCard);
        crupierCardsDisplay.style.display = 'flex';
    }

    // mostrar la puntuación del crupier
    crupierScoreElement.innerText = manoCrupier.cuentaPuntos();
    
    // condiciones de derrota, empate o victoria.
    if(manoCrupier.cuentaPuntos() > 21 || manoCrupier.cuentaPuntos() < mano.cuentaPuntos()) {
        alert('HAS GANADO');

        let bet = betElement.innerText;
        bet = Number(bet.substring(0, bet.indexOf('€')));
        let currentBalance = currentBalanceElement.innerText;
        currentBalance = Number(currentBalance.substring(0, currentBalance.indexOf('€')));

        // si ganas, recibes el doble de lo apostado.
        currentBalanceElement.innerText = (currentBalance + bet*2) + '€';
    } else if(manoCrupier.cuentaPuntos() === mano.cuentaPuntos()) {
        alert('EMPATE')

        let bet = betElement.innerText;
        bet = Number(bet.substring(0, bet.indexOf('€')));
        let currentBalance = currentBalanceElement.innerText;
        currentBalance = Number(currentBalance.substring(0, currentBalance.indexOf('€')));

        // si hay empate, recuperas lo apostado
        currentBalanceElement.innerText = (currentBalance + bet) + '€';
    } else {
        alert('HAS PERDIDO');
    }
    // se desactivan los botones.
    handleButtons(true);
}