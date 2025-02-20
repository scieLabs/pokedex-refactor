//fetching Pokémon

const fetchPokemon = async (pokeId) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const pokemonJson = await response.json();
        return pokemonJson;

    } catch (error) {
        console.error("You caught a wild error!", error);
    };
};

export { fetchPokemon };