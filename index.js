import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js"; //import search bar component
//div
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]'); //form
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States - changed states from CONST to LET because page variables need to be able to change.
let maxPage = 1;
let page = 1;
let searchQuery = "";

const searchBarEvent = SearchBar((event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters();
});
searchBarContainer.append(searchBarEvent);
fetchCharacters();


async function fetchCharacters() {
  const result = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
  );
  const data = await result.json();
  console.log(data);
  if (data.error) {
    cardContainer.textContent = "No data to display";
  } else {
    const characters = data.results;
    
    //get max pages data
    maxPage = data.info.pages;

    //call function to update pagination info 
    NavPagination(pagination, page, maxPage)

    cardContainer.innerHTML = "";

    // Create an empty array to manually hold the generated card elements
    const generatedCards = [];

    // Use a traditional for...of loop to transform each raw character data object into a DOM element
    for (const character of characters) {
      // Call the function explicitly, passing the current character object as an argument
      const newCardElement = createCharacterCard(character);

      // Push the newly created DOM card element into our temporary array
      generatedCards.push(newCardElement);
    }

    // Use a traditional for...of loop to take each generated DOM element and append it to the page
    for (const card of generatedCards) {
      // Explicitly append the current card DOM element to the parent container element
      cardContainer.append(card);
    }
  }
}

// call function for next button
NavButton(nextButton, ()=>{
  if (page < maxPage){
    page++;
    fetchCharacters();
  }
});

// call function for previous button
NavButton(prevButton, ()=>{
  if (page > 1){
    page--;
    fetchCharacters();
  }
});
