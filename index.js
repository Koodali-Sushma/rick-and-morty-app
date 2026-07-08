import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States - changed states because page variables need to be able to change.
let maxPage = 1;
let page = 1;
const searchQuery = "";


// create variable that captures card creation
const createCard = createCharacterCard();

// append card creation
cardContainer.append(createCard);

// call function for next button
NavButton(nextButton, ()=>{
  if (page < maxPage){
    page++;
    fetchCharacters();
    NavPagination();
  }
});

// call function for previous button
NavButton(prevButton, ()=>{
  if (page > 1){
    page--;
    fetchCharacters();
    NavPagination();
  }
});
