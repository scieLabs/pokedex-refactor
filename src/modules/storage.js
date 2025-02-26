
// Load existing favorites from localStorage
let favorites;
try {
    favorites = JSON.parse(localStorage.getItem("favorites")) || [];
} catch (error) {
    favorites = [];  // Fallback if parsing fails
    console.error("Error loading favorites:", error);
}

// Function to add a Pokémon to favorites
export const addToFavorites = (pokemon, favoriteIcon) => {
    if (!favorites.some(fav => fav.id === pokemon.id)) {
        favorites.push({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default
        });
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // Update the icon style if provided
        if (favoriteIcon) {
            favoriteIcon.classList.add("fa");
            favoriteIcon.classList.remove("fa-regular");
        }

        alert(`${pokemon.name} added to favorites!`);
    } else {
        alert(`${pokemon.name} is already in favorites.`);
    }
};

// Function to remove a Pokémon from favorites
export const removeFromFavorites = (pokemon, favoriteIcon) => {
    //console.log(pokemon);  // Debugging to check if correct data is received

    favorites = favorites.filter(fav => fav.id !== pokemon.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    let saveNotes = JSON.parse(localStorage.getItem("note")) || [];

    saveNotes = saveNotes.filter((note) => note.pokemonID !== pokemon.id);
    localStorage.setItem("note", JSON.stringify(saveNotes)); // Update notes in localStorage


    // Update the icon style if provided
    if (favoriteIcon) {
        favoriteIcon.classList.add("fa-regular");
        favoriteIcon.classList.remove("fa");
    }

    alert(`${pokemon.name} removed from favorites!`);

    
};

