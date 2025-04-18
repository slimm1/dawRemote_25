let battle = null;

document.addEventListener('DOMContentLoaded', () => {
  const context = document.querySelector('.ej1');
  if(context){
    getPokemonXHR();
    getPokemonFetch();
    getPokemonJQuery();
  } else {
    const generateButton = document.getElementById('generate');
    const fightButton = document.getElementById('fight');
    generateButton.addEventListener('click', () => generatePokemonBattleGameCards());
    fightButton.addEventListener('click', () => fight());
  }

});

function createCard(pokemon, showStats, containerId) {
    const container = document.getElementById(containerId);
    
    const stats = {
      hp: null,
      attack: null,
      defense: null
    };
  
    pokemon.stats.forEach(stat => {
      if (stat.stat.name === 'hp') stats.hp = stat.base_stat;
      if (stat.stat.name === 'attack') stats.attack = stat.base_stat;
      if (stat.stat.name === 'defense') stats.defense = stat.base_stat;
    });
  
    const div = document.createElement('div');
    div.className = 'pokemon-card';
    div.addEventListener('click', () => pokemonCardClick(div));
    div.setAttribute('data-hp', stats.hp);
    div.setAttribute('data-attack', stats.attack);
    div.setAttribute('data-defense', stats.defense);
  
    div.innerHTML = `
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      ${showStats ? '' : `<p><strong>Tipos:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>`}
      ${showStats ? `
        <p><strong>HP:</strong> ${stats.hp}</p>
        <p><strong>Ataque:</strong> ${stats.attack}</p>
        <p><strong>Defensa:</strong> ${stats.defense}</p>
      ` : ''}
    `;

    if(containerId === 'pokemon-xhr'){
      div.setAttribute('data-player', 'player1');
    } else if(containerId === 'pokemon-fetch') {
      div.setAttribute('data-player', 'player2')
    } else if(containerId === 'pokemon-ajax'){
      div.setAttribute('data-player', 'player3');
    }
  
    container.appendChild(div);
}

// Generar un array de ids random 
function getRandomIds(count = 6) {
    const ids = [];
    while (ids.length < count) {
        const rand = Math.floor(Math.random() * 898) + 1; 
        if (!ids.includes(rand)) ids.push(rand);
    }
    return ids;
}

// Recuperar informacion de la pokeapi a traves de XHR
function getPokemonXHR(container = 'pokemonContainer', showStats = false) {
    const ids = getRandomIds();
    ids.forEach(id => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`);
      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          createCard(data, showStats, container);
        }
      };
      xhr.send();
    });
}

// función asícrona para trabajar con fetch. Las peticiones se ejcutan secuencialmente
async function getPokemonFetch(container = 'pokemonContainer', showStats = false) {
    const ids = getRandomIds();
    for (const id of ids) {
        try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        createCard(data, showStats, container);
        } catch (error) {
        console.error('Error con fetch:', error);
        }
    }
}

// Uso de Jquery para cargar seis pokemons
function getPokemonJQuery(container = 'pokemonContainer', showStats = false) {
    const ids = getRandomIds();
    ids.forEach(id => {
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        method: 'GET',
        success: function (data) {
          createCard(data, showStats, container);
        },
        error: function (err) {
          console.error('Error con jQuery AJAX:', err);
        }
      });
    });
}

function pokemonCardClick(element) {
  const parent = element.parentNode;
  const cards = parent.querySelectorAll('.pokemon-card');
  const player = element.dataset.player;

  cards.forEach(card => card.classList.remove('active'));
  element.classList.toggle('active');
  battle.addPokemon({
    hp: element.dataset.hp,
    attack: element.dataset.attack,
    defense: element.dataset.defense
  }, player);
}

function generatePokemonBattleGameCards() {
  cleanTable();
  getPokemonXHR('pokemon-xhr', true);
  getPokemonFetch('pokemon-fetch', true);
  getPokemonJQuery('pokemon-ajax', true);
  battle = new Battle();
}

function fight() {
  if(!evaluateGameState()){
    return;
  }
  const winner = battle.fight();
  const winnerCard = document.querySelector(`.pokemon-card.active[data-player="${winner}"]`);

  document.querySelectorAll('.winner').forEach(win => win.classList.remove('winner'));

  winnerCard.classList.remove('active');
  winnerCard.classList.add('winner');

  const activeCards = document.querySelectorAll('.pokemon-card.active');
  activeCards.forEach(card => card.remove());
  if(getActivePlayers() === 1) {
    alert(`¡Jugador ${winner} ha ganado la partida!`);
    cleanTable();
  }
}

function evaluateGameState() {
  const players = getActivePlayers();
  if(battle.pokemon.length < players){
    alert('Todos los jugadores deben seleccionar un pokemon para combatir');
    return false;
  }  
  return true;
}

function getActivePlayers() {
  const containers = document.querySelectorAll('.pokemon-container');
  let filledCount = 0;
  
  containers.forEach(container => {
    if (container.children.length > 0) {
      filledCount++;
    }
  });

  return filledCount;
}

function cleanTable() {
  const containers = document.querySelectorAll('.pokemon-container');
  containers.forEach(cont => cont.innerHTML = '');
}