import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import { ErrorButton } from "./components/ErrorHandling/ErrorButton.js";

//Query Container Parent Elements from HTML
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const cardContainer = document.querySelector('[data-js="card-container"]');
//const searchBar = document.querySelector('[data-js="search-bar"]'); //form
const navigation = document.querySelector('[data-js="navigation"]');
//const prevButton = document.querySelector('[data-js="button-prev"]');
//const nextButton = document.querySelector('[data-js="button-next"]');
let pagination = document.querySelector('[data-js="pagination"]');

// States - changed states from CONST to LET because page variables need to be able to change.
let maxPage = 1;
let searchQuery = "";
// Check if a saved page exists. If yes, convert it to a number; if no, default to 1.
const savedPage = localStorage.getItem("saved_rick_morty_page");
let page = savedPage ? parseInt(savedPage, 10) : 1;
localStorage.removeItem("saved_rick_morty_page"); //clearing storage after reading

//Core Fetch API Function
async function fetchCharacters() {
  try {
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
      console.log("maxPage", maxPage);
      pagination.textContent = `${page} / ${maxPage}`;
      /* //call function to update pagination info
     NavPagination(pagination, page, maxPage); */

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
      console.log("generatedCards", generatedCards);
      // Use a traditional for...of loop to take each generated DOM element and append it to the page
      for (const card of generatedCards) {
        // Explicitly append the current card DOM element to the parent container element
        cardContainer.append(card);
      }
      console.log("cardContainer", cardContainer);
    }
    //trying to handle the error
    // and give the user a retry button to fetch the data again
    // (continue from the page where got error)
  } catch (error) {
    console.error("Failed to load characters from multiverse:", error);
    pagination.textContent = "0 / 0";

    //Clear the page so the broken UI layout disappears
    cardContainer.innerHTML = "";

    //DISABLE BUTTONS: Freeze the navigation buttons instantly
    prevButton.disabled = true;
    nextButton.disabled = true;

    //Create the dynamic error button component
    const retryButton = ErrorButton(() => {
      // Save the current page number before wiping the browser memory
      localStorage.setItem("saved_rick_morty_page", page);

      // Action: Clear the error button message and attempt to download data again
      cardContainer.innerHTML = "<li>Loading...</li>";

      // Refresh the page
      location.reload();
    });

    console.log(error.message);

    //Append the button directly into the viewport below the nav element

    navigation.append(retryButton);
  }
}

// Initialize the UI Components and pass state-logic callbacks
const nextButton = NavButton("next", "button--next", () => {
  if (page < maxPage) {
    page++;
    fetchAndUpdatePagination();
  }
});

const prevButton = NavButton("previous", "button--prev", () => {
  if (page > 1) {
    page--;
    fetchAndUpdatePagination();
  }
});

const searchBarEvent = SearchBar((event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1; // Reset back to first page for new searches
  fetchCharacters();
});

pagination = NavPagination();

// Inject the created elements into your HTML layout
navigation.append(prevButton, pagination, nextButton);
searchBarContainer.append(searchBarEvent);

// Helper Function to handle state changes
function fetchAndUpdatePagination() {
  pagination.textContent = `${page} / ${maxPage}`;
  fetchCharacters();
}

//Kick off the initial load
fetchCharacters();
