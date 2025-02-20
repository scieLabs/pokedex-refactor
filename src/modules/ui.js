import { fetchPokemon } from "./network.js";
import { addToFavorites } from "./storage.js";
import { removeFromFavorites } from "./storage.js";

let saveNotes = JSON.parse(localStorage.getItem("note")) || [];

const displayPokemon = async () => {
    const cardsContainer = document.getElementById('cards-container');
    const pokeNames = [];
    const pokeIds = [];

    for(let i = 1; i <= 151; i++) {
        const pokemon = await fetchPokemon(i);

        if (pokemon) {
            const pokeCard = document.createElement('div');
            pokeCard.classList.add(
                "justify-items-center",
                "bg-[#f6eac4]",
                "text-center",
                "shadow-lg",
                "bg-[url('../img/cards-background.png')]", //gotta be adjusted
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
            favoriteIcon.classList.add("fa-heart","text-lg","cursor-pointer","text-red-400","mt-2");
            if (!favorites.some(fav => fav.id === pokemon.id)) 
                favoriteIcon.classList.add("fa-regular");
            else{
                favoriteIcon.classList.add("fa");
                favoriteIcon.classList.remove("fa-regular");
            }
            favoriteIcon.addEventListener("click", () => addToFavorites(pokemon,favoriteIcon));
             
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



const loadFavorites = async () => {
    // Ensure the container exists
    if (!cardsContainer) return;

    // Clear the current display
    cardsContainer.innerHTML = '';

    // Get the updated favorites array from localStorage
     favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Fetch all Pokémon data concurrently
    const pokemonDataArray = await Promise.all(favorites.map(fav => fetchPokemon(fav.id)));

    pokemonDataArray.forEach((pokemonData) => {
        if (!pokemonData) return;

        // Create the Pokémon card
        const pokeCard = document.createElement('div');
        pokeCard.classList.add(
            "justify-items-center",
            "bg-[#f6eac4]",
            "text-center",
            "shadow-lg",
            "bg-[url('../img/cards-background.png')]",
            "bg-cover",
            "min-h-[200px]",
            "rounded-sm"
        );

        const pokeImg = document.createElement('img');
        pokeImg.src = pokemonData.sprites.front_default;
        pokeImg.alt = pokemonData.name;
        pokeImg.classList.add("mb-4");

        const pokeName = document.createElement('h3');
        pokeName.textContent = pokemonData.name.toUpperCase();
        pokeName.classList.add(
            "font-bold",
            "text-[#bc7a25]",
            "tracking-wider",
            "-skew-x-10"
        );

        const pokeInfo = document.createElement('span');
        pokeInfo.classList.add("flex-col", "gap-2", "text-sm", "block");

        const pokemonId = document.createElement('h5');
        pokemonId.textContent = `ID: #${pokemonData.id}`;
        pokemonId.classList.add("font-bold", "text-[#bc7a25]");

        const pokeType = document.createElement('p');
        pokeType.textContent = `Type: ${pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ")}`;
        pokeType.classList.add("text-[#bc7a25]");

        // Favorite icon (remove from favorites on click)
        const favoriteText = document.createElement("i");
        favoriteText.id = `favorite-${pokemonData.id}`;
        favoriteText.classList.add("fa","fa-heart","text-lg","cursor-pointer","text-red-400","block", "m-1");
        favoriteText.addEventListener("click", () => removeFromFavorites(pokemonData));

        const addNoteContainer = document.createElement("div");
        addNoteContainer.classList.add("flex","justify-center");

        const notesInput = document.createElement('input'); //will need to edit the pokécard height to make sure it fits
            notesInput.type = 'text';
            notesInput.placeholder = 'Add a note!';
            notesInput.classList.add(
                "px-4",
                "w-[90%]",
                "h-8",
                "bg-white",
                "shadow-md",
                "rounded-lg",
                "border",
                "text-xs",
                "m-1",
                "inline-block",
                "relative",
                "-mr-[9px]"
            );

        const addNotesButton = document.createElement('i');
        //addNotesButton.textContent = " Save"
        addNotesButton.classList.add(
            "fa-solid",
            "fa-check",
            "cursor-pointer",
            "text-[#008913]",
            "font-bold",
            "relative",
            "right-[12px]",
            "top-[12px]"

        ); //will style later when it works

        const noteUl = document.createElement("ul");
        noteUl.classList.add("list-none","w-full","px-5");
        const addNote = (note) => {
            const newNote = document.createElement('li');
            newNote.setAttribute("id", note.id);
            // newNote.textContent = note.text;
            newNote.classList.add("text-xs","flex","justify-between","my-2","items-center", "bg-[#EFE9D0]");
            
            const notesContainer = document.createElement('span');
            notesContainer.textContent = note.text; //should make the text of the span be the li items?
            notesContainer.classList.add(
                "block",
                "text-[#90402c]",
                "overflow-x-auto", //currently doesnt do anything, nor the one below
                "scrollbar",
                
            );

            //creates delete button and removes element
            const deleteBtn = document.createElement('i');
            //deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add("fa-solid","fa-trash", "hover:font-bold","text-[#e30000]","cursor-pointer");
            deleteBtn.addEventListener('click', () => {
                saveNotes = saveNotes.filter((note) => note.id !== newNote.id);
                localStorage.setItem("note", JSON.stringify(saveNotes));

                noteUl.removeChild(newNote);
            });

            newNote.appendChild(notesContainer);
            newNote.appendChild(deleteBtn);
            noteUl.appendChild(newNote);
        }


        addNotesButton.addEventListener('click', (e) => {
            console.log(pokemonData.id);
            const finalNote = notesInput.value.trim();
            //add note to card from input field
            if (finalNote) {
                let noteObject = {
                    id: `${new Date().getTime()}${finalNote}`,
                    pokemonID: pokemonData.id,
                    text: finalNote
                }
                saveNotes.push(noteObject);
                localStorage.setItem("note", JSON.stringify(saveNotes));
                addNote(noteObject);
                notesInput.value = '';
                notesInput.focus();
            } else {
                alert('You cannot submit an empty note.')
            }


        });
            

        // Append all elements to the card
    pokeCard.appendChild(pokeImg);
    pokeCard.appendChild(pokeName);
    pokeInfo.appendChild(pokemonId);
    pokeInfo.appendChild(pokeType);
    pokeInfo.appendChild(favoriteText); // Unfavorite button 
    pokeCard.appendChild(pokeInfo);
    addNoteContainer.appendChild(notesInput); //same as above
    addNoteContainer.appendChild(addNotesButton); //just testing if it works, delete later
    pokeCard.appendChild(addNoteContainer);
    pokeCard.appendChild(noteUl);

    saveNotes.forEach((note) => {
        if(note.pokemonID == pokemonData.id) {
            addNote(note);
        }
    })


    cardsContainer.appendChild(pokeCard);
    });
};

// const searchElement = document.querySelector("#search-bar input");

// searchElement.addEventListener("keyup" , function(e) {
//     const searchText = e.target.value;

//      if(!isNaN(searchText))
//         searchById(searchText);
//     else
//         searchByName(searchText);
// });

// this part above will probably go into app.js?

// const searchByName = (searchName) => {
//     pokeNames.forEach(pokeName => {
//         if(!pokeName.textContent.includes(searchName.toUpperCase()))
//             pokeName.parentElement.classList.add("hidden");
//         else
//         pokeName.parentElement.classList.remove("hidden");
//     })
// };

// const searchById = (searchId) => {
//     pokeIds.forEach(pokeId => {

//         if(pokeId.textContent.includes(searchId))
//             pokeId.parentElement.parentElement.classList.remove("hidden");
//         else
//         pokeId.parentElement.parentElement.classList.add("hidden");
//     })
// };

export { displayPokemon };
export { loadFavorites };
// export { searchByName };
// export { searchById };