// importing functions from other js files
import { getMovies } from './fetchMovies.js';
import { getPeople } from "./fetchPeople.js";
import { getPlanet } from './fetchPlanets.js';
import { getVehicles } from './fetchVehicles.js';

// getting buttons from html
const exploreMoviesBtn = document.querySelector('.button__movies');
const mainElement = document.querySelector('main');
const exploreCharactersBtn = document.querySelector(".button__characters");
const explorePlanetsBtn = document.querySelector(".button__planets");
const exploreVehiclesBtn = document.querySelector(".button__vehicles");

// event listeners for the nav buttons

// Explore Movies button
exploreMoviesBtn.addEventListener('click', () => {
  mainElement.innerHTML = '';
  getMovies();
});

// Explore Characters button
exploreCharactersBtn.addEventListener('click', () => {
    mainElement.innerHTML = '';
    getPeople();
});

// Explore planets button
explorePlanetsBtn.addEventListener("click", () => {
    mainElement.innerHTML = "";
    getPlanet();
});

// Explore vehicles button
exploreVehiclesBtn.addEventListener("click", () => {
    mainElement.innerHTML = "";
    getVehicles();
});

// Show Movies by default when page opens
window.addEventListener('DOMContentLoaded', () => {
    mainElement.innerHTML = '';
    getMovies();
});
  

