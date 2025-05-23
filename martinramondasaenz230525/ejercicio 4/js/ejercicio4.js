/**
 * @author Martín Ramonda
 * @version Convocatoria Ordinaria 2025
 * @pc 20
 */

let superheroesData = [];

document.addEventListener('DOMContentLoaded', () => {

    const player1Selector = document.getElementById('selectPlayer1');
    const player2Selector = document.getElementById('selectPlayer2');
    const fightButton = document.getElementById('fightButton');

    // Para recuperar la información del server:
    fetch('http://localhost/dwec/superheroes.php')
    .then(response => {
        if(!response.ok) {
            throw new Error("error al recuperar la información de los superhéroes");
        }
        return response.json();
    }).then(data => {
        Object.entries(data).forEach(item => {
            superheroesData.push({
                key: item[0],
                data: item[1]
            });
        });
        console.log(superheroesData);
        if(superheroesData.length > 0){
            superheroesData.forEach(item => {
                const name = item.data.nombre;
                const key = item.key;
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = key;
                option1.innerText = name;
                option2.value = key;
                option2.innerText = name;
                player1Selector.append(option1);
                player2Selector.append(option2);
            });
        }
    });

    // eventos change en los selectores:
    player1Selector.addEventListener('change', () => loadSuperHeroCard('cardPlayer1', player1Selector, fightButton));
    player2Selector.addEventListener('change', () => loadSuperHeroCard('cardPlayer2', player2Selector, fightButton));

    // No me da tiempo a implementar el evento click para luchar:
    fightButton.addEventListener('click', () => {
        const player1key = player1Selector[player1Selector.selectedIndex].value;
        const player2key = player2Selector[player2Selector.selectedIndex].value;
        const player1hero = superheroesData.filter(sh => sh.key === player1key)[0] ?? [];
        const player2hero = superheroesData.filter(sh => sh.key === player2key)[0] ?? [];    
        console.log("LUCHA " + player1hero.data.nombre + " VS " + player2hero.data.nombre);
    });
});

function fight() {

}

function loadSuperHeroCard(cardId, selector, fight) {
    const card = document.getElementById(cardId);
    const key = selector[selector.selectedIndex].value;
    if(key.length === 0){
        card.innerHTML = '';
        fight.style.display = 'none';
    } else {
        const selectedHero = superheroesData.filter(sh => sh.key === key);
        const data = selectedHero[0].data;
        card.innerHTML = `
            <h1>${data.nombre}</h1>
            <p>Fuerza: ${data.fuerza}</p>
            <p>Agilidad: ${data.agilidad}</p>
            <p>Inteligencia: ${data.inteligencia}</p>
            <img src="${data.imagen}" alt="${key}">
        `;

        document.querySelectorAll('option').forEach(opt => opt.disabled = false);

        if(cardId === 'cardPlayer1'){
            const eqOption = document.querySelector(`#selectPlayer2 option[value=${key}]`);
            eqOption.disabled = true;
        } else {
            const eqOption = document.querySelector(`#selectPlayer1 option[value=${key}]`);
            eqOption.disabled = true;
        }

        const cards = document.querySelectorAll('.superhero-card');
        cards.forEach(card => {
            if(card.innerHTML.length === 0) {
                fight.style.display = 'none';
                return;
            }
            fight.style.display = 'block';
        });
    }
}
