/**
 * @author Martín Ramonda
 * @version Convocatoria Ordinaria 2025
 * @pc 20
 */

const monedas = [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]

function cambiar(number) {
    const result = [];
    // Algoritmo para construir el array de monedas.
    monedas.forEach(moneda => {
        let count = 0;
        while(number-moneda >= 0) {
            count++;
            number = number-moneda;
            if(number/moneda < 1) {
                result.push({
                    moneda: moneda,
                    count: count
                });
                break;
            }
        }
    });
    escribir(result);
    pintar(result);
}

function escribir(monedas) {
    const textContainer = document.querySelector("div[name='mostrartexto']");
    let message = 'Monedas a devolver: ';
    monedas.forEach((obj, index) => {
        if(index+1 === monedas.length){
            message += `y ${obj.count} monedas de ${obj.moneda}€.`;
        } else {
            message += `${obj.count} monedas de ${obj.moneda}€, `;
        }
    });
    textContainer.innerText = message;
}

function pintar(monedas) {
    const imageDiv = document.querySelector("div[name='mostrarimagenes']");
    imageDiv.innerHTML = ``;
    monedas.forEach(obj => {
        for(let i = 0; i<obj.count; i++) {
            const img = document.createElement('img');
            img.src = getImageForMoneda(obj.moneda);
            imageDiv.append(img);
        }
    });
}

function getImageForMoneda(moneda) {
    switch(moneda) {
        case 2: return 'img/monedas/2euro.jpg';
        case 1: return 'img/monedas/1euro.jpg';
        case 0.5: return 'img/monedas/50cent.jpg';
        case 0.2: return 'img/monedas/20cent.jpg';
        case 0.1: return 'img/monedas/10cent.jpg';
        case 0.05: return 'img/monedas/5cent.jpg';
        case 0.02: return 'img/monedas/2cent.jpg';
        case 0.01: return 'img/monedas/1cent.jpg';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('input[type="submit"]');
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const input = document.querySelector('textarea');
        cambiar(Number(input.value));
    });
});