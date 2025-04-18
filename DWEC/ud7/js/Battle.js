class Battle {
    constructor() {
        this.pokemon = [];
    }

    addPokemon(pokemon, player) {
        const index = this.pokemon.findIndex(p => p.player === player);
        
        if (index !== -1) {
            this.pokemon[index].pokemon = pokemon;
        } else {
            this.pokemon.push({ player: player, pokemon: pokemon });
        }
    }

    fight() {
        if (this.pokemon.length < 2) {
            return 'No hay suficientes Pokémon para combatir.';
        }
    
        let winner = null;
        let maxScore = -Infinity;
    
        for (const entry of this.pokemon) {
            const attack = Number(entry.pokemon.attack);
            const defense = Number(entry.pokemon.defense);
            const score = attack + defense;
    
            if (score > maxScore) {
                maxScore = score;
                winner = entry.player;
            } else if (score === maxScore) {
                winner = 'Empate';
            }
        }

        this.pokemon = [];
    
        return winner;
    }
}