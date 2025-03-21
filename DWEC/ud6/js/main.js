let mazo = null;
let mano = null; 

document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('new-game');
    const endGameButton = document.getElementById('end-game');
    const getCardButton = document.getElementById('get-card');

    newGameButton.addEventListener('click', () => startNewGame());
    getCardButton.addEventListener('click', () => giveCard());
    endGameButton.addEventListener('click', () => plantarse());
});

function startNewGame() {
    resetTable();
    const currentBalanceElement = document.getElementById('current-balance').querySelector('span');
    const betElement = document.getElementById('current-bet').querySelector('span');
    
    let currentBalance = currentBalanceElement.innerText;
    currentBalance = Number(currentBalance.substring(0, currentBalance.indexOf('€')));
    
    let bet = prompt('Introduce la cantidad que deseas apostar:');
    bet = validateBet(bet, currentBalance);

    if(!bet){
        return;
    }

    handleButtons(false);

    currentBalanceElement.innerText = (currentBalance - bet) + '€';
    betElement.innerText = bet + '€';

    mano = new Mano();
    if(!mazo){
        mazo = new Mazo();
        giveCard();
        giveCard();
    }
}

function giveCard() {
    const card = mazo.daCarta();
    mano.anadirCarta(card);
    const width = getSpriteWidth(card.valor);
    const heigth = getSpriteHeigth(card.palo);

    const playerCardsDisplay = document.querySelector('.player .cards-display');
    const newCard = document.createElement('div');
    newCard.classList.add('game-card');
    newCard.style.backgroundImage = `url(assets/cartas.png)`;
    newCard.style.backgroundPosition = `-${width}px -${heigth}px`;
    playerCardsDisplay.append(newCard);
    playerCardsDisplay.style.display = 'flex';

    const playerScoreElement = document.getElementById('player-score').querySelector('span');
    playerScoreElement.innerText = mano.cuentaPuntos();

    if(mano.cuentaPuntos() > 21){
        alert('HAS PERDIDO');
        handleButtons(true);
    }
}

function getSpriteHeigth(palo) {
    switch (palo) {
        case 'diamantes': return 288;
        case 'treboles': return 192;
        case 'corazones': return 96;
        default: return 0;
    }
}

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
    const manoCrupier = new Mano();

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

    crupierScoreElement.innerText = manoCrupier.cuentaPuntos();
    
    if(manoCrupier.cuentaPuntos() > 21 || manoCrupier.cuentaPuntos() < mano.cuentaPuntos()) {
        alert('HAS GANADO');

        let bet = betElement.innerText;
        bet = Number(bet.substring(0, bet.indexOf('€')));
        let currentBalance = currentBalanceElement.innerText;
        currentBalance = Number(currentBalance.substring(0, currentBalance.indexOf('€')));

        currentBalanceElement.innerText = (currentBalance + bet*2) + '€';
    } else if(manoCrupier.cuentaPuntos() === mano.cuentaPuntos()) {
        alert('EMPATE')

        let bet = betElement.innerText;
        bet = Number(bet.substring(0, bet.indexOf('€')));
        let currentBalance = currentBalanceElement.innerText;
        currentBalance = Number(currentBalance.substring(0, currentBalance.indexOf('€')));

        currentBalanceElement.innerText = (currentBalance + bet) + '€';
    } else {
        alert('HAS PERDIDO');
    }
    handleButtons(true);
}