import { loadFavorites } from "./ui.js";

let favorites = localStorage.getItem("favorites");
favorites = favorites ? JSON.parse(favorites) : [];

const addToFavorites = (pokemon,favoriteIcon) => {

    if (!favorites.some(fav => fav.id === pokemon.id)) {
      favorites.push({ id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log(favoriteIcon);
      favoriteIcon.classList.add("fa");
      favoriteIcon.classList.remove("fa-regular");
      alert(`${pokemon.name} added to favorites!`);
    } else {
      alert(`${pokemon.name} is already in favorites.`);
    }
  };

  const removeFromFavorites = (pokemon) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex(fav => fav.id === pokemon.id);

    if (index !== -1) {
        // Remove from favorites.
        favorites.splice(index, 1);
        console.log(`${pokemon.name} removed from favorites`);
    }

    // Save the updated favorites array to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    saveNotes = saveNotes.filter((note) => note.pokemonID !== pokemon.id);
    localStorage.setItem("note", JSON.stringify(saveNotes)); // Update notes in localStorage

    // Reload favorites to reflect the change
    loadFavorites();
};

//   let saveNotes = JSON.parse(localStorage.getItem("note")) || [];

  export { addToFavorites };
  export { removeFromFavorites };