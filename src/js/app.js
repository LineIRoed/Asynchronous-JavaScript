// app.js
import { getMovies } from './fetchMovies.js'; // Import the fetchMovies function
import { getPeople } from "./fetchPeople.js";
import { getPlanet } from './fetchPlanets.js';
import { getVehicles } from './fetchVehicles.js';

const exploreMoviesBtn = document.querySelector('.button__movies');
const mainElement = document.querySelector('main');
const exploreCharactersBtn = document.querySelector(".button__characters");
const explorePlanetsBtn = document.querySelector(".button__planets");
const exploreVehiclesBtn = document.querySelector(".button__vehicles");


// Event listener for 'Explore Movies' button
exploreMoviesBtn.addEventListener('click', () => {
  mainElement.innerHTML = ''; // Clear any previous content in the main element
  getMovies(); // Fetch and display the movies with the search bar
});

// Event listener for 'Explore Characters' button
exploreCharactersBtn.addEventListener('click', () => {
    mainElement.innerHTML = ''; // Clear any previous content in the main element
    getPeople(); // Fetch and display the movies with the search bar
});

// event listener for "Explore planets" button
explorePlanetsBtn.addEventListener("click", () => {
    mainElement.innerHTML = "";
    getPlanet();
});

//event listener for "Explore vehicles" button
exploreVehiclesBtn.addEventListener("click", () => {
    mainElement.innerHTML = "";
    getVehicles();
});

