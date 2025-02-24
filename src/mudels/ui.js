import fetchPokemon from "./network.js";
import { addToFavorites } from "./storage.js";

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const cardsContainer = document.getElementById('cards-container');
const searchElement = document.querySelector("#search-bar input");
const pokeNames = [];
const pokeIds = [];

export const displayPokemon = async () => {
    for (let i = 1; i <= 151; i++) {
        const pokemon = await fetchPokemon(i);
        console.log("Received data:", pokemon);
        if (pokemon) {
            const pokeCard = document.createElement('div');
            pokeCard.classList.add(
                "justify-items-center",
                "bg-[#f6eac4]",
                "text-center",
                "shadow-lg",
                "bg-[url('img/cards-background.png')]",
                "bg-cover",
                "min-h-[200px]",
                "max-h-fit",
                "rounded-sm"
            );


            const pokeImg = document.createElement('img');
            pokeImg.src = pokemon.sprites.front_default;
            pokeImg.alt = pokemon.name;
            pokeImg.classList.add();
            // add margins/padding/size

            const pokeName = document.createElement('h3');
            pokeName.textContent = pokemon.name.toUpperCase(); //lets see what this does
            pokeName.classList.add(
                "font-bold",
                "text-[#bc7a25]",
                "tracking-wider",
                "-skew-x-10"

            );

            const pokeInfo = document.createElement('span');
            pokeInfo.classList.add("flex-col", "gap-2", "text-sm");

            const pokemonId = document.createElement('h5');
            pokemonId.textContent = `ID: #${pokemon.id}`;
            pokemonId.classList.add(
                "font-bold",
                "text-[#bc7a25]"
            );

            const pokeType = document.createElement('p');
            pokeType.textContent = `Type: ${pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}`; //see what that does
            pokeType.classList.add(
                "text-[#bc7a25]"
            );


            /// favoriteIcon
            const favoriteIcon = document.createElement("i");
            favoriteIcon.classList.add("fa-heart", "text-lg", "cursor-pointer", "text-red-400", "mt-2");
            if (!favorites.some(fav => fav.id === pokemon.id))
                favoriteIcon.classList.add("fa-regular");
            else {
                favoriteIcon.classList.add("fa");
                favoriteIcon.classList.remove("fa-regular");
            }
            favoriteIcon.addEventListener("click", () => addToFavorites(pokemon, favoriteIcon));

            pokeCard.appendChild(pokeImg);
            pokeCard.appendChild(pokeName);
            pokeInfo.appendChild(pokemonId);
            pokeInfo.appendChild(pokeType);
            pokeCard.appendChild(pokeInfo);
            pokeInfo.appendChild(favoriteIcon);
            cardsContainer.appendChild(pokeCard);
            pokeNames.push(pokeName);
            pokeIds.push(pokemonId);
        }

    }

};


export const searchFunc = () => 
    { 
        searchElement.addEventListener("keyup", function (e) {
            const searchText = e.target.value;

            if (!isNaN(searchText))
                searchById(searchText);
            else
                searchByName(searchText);
        }); 
    }


const searchByName = (searchName) => {
    pokeNames.forEach(pokeName => {
        if (!pokeName.textContent.includes(searchName.toUpperCase()))
            pokeName.parentElement.classList.add("hidden");
        else
            pokeName.parentElement.classList.remove("hidden");
    })
}

const searchById = (searchId) => {
    pokeIds.forEach(pokeId => {

        if (pokeId.textContent.includes(searchId))
            pokeId.parentElement.parentElement.classList.remove("hidden");
        else
            pokeId.parentElement.parentElement.classList.add("hidden");
    })
}

//export default {displayPokemon, addToFavorites};