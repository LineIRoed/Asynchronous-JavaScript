// Get movie posters
const moviePosters = {
  "A New Hope": "/assets/posters/a-new-hope.jpg",
  "The Empire Strikes Back": "/assets/posters/the-empire-strikes-back.jpg",
  "Return of the Jedi": "/assets/posters/return-of-the-jedi.jpg",
  "The Phantom Menace": "/assets/posters/the-phantom-menace.jpg",
  "Attack of the Clones": "/assets/posters/attack-of-the-clones.jpg",
  "Revenge of the Sith": "/assets/posters/revenge-of-the-sith.jpg",
  "The Force Awakens": "/assets/posters/the-force-awakens.jpg",
  "The Last Jedi": "/assets/posters/the-last-jedi.jpg",
  "The Rise of Skywalker": "/assets/posters/the-rise-of-skywalker.jpg"
};

let movieDataArray = [];

// Create bold header and text
function createMovieDetail(header, text) {
const movieDetail = document.createElement("p");
const strongHeader = document.createElement("strong");
strongHeader.classList.add("info-header");
strongHeader.textContent = `${header}:`;

movieDetail.append(strongHeader);
movieDetail.append(document.createTextNode(` ${text}`));

return movieDetail;
}

// Search bar
function createSearchForm() {
const searchForm = document.createElement("form");
searchForm.classList.add("search-form");

const searchInput = document.createElement("input");
searchInput.classList.add("search-form__input");
searchInput.type = "text";
searchInput.placeholder = "Search for a movie...";

const searchButton = document.createElement("button");
searchButton.classList.add("search-form__button");
searchButton.type = "submit";
searchButton.textContent = "Search";

searchForm.appendChild(searchInput);
searchForm.appendChild(searchButton);

return searchForm;
};

// Display the movies
const displayMovies = (moviesData) => {
const mainElement = document.querySelector("main");
const moviesList = document.createElement("ul");
moviesList.classList.add("movies-card__list");

const searchForm = createSearchForm();
mainElement.innerHTML = "";
mainElement.appendChild(searchForm);

if (moviesData.length > 0) {
  moviesData.forEach((movie) => {
    const movieItem = document.createElement("li");
    movieItem.classList.add("movies-card__item");

    // Add the movie poster
    const moviePoster = document.createElement("img");
    const posterUrl = moviePosters[movie.title] || "/assets/posters/default-poster.jpg"; // Fallback if no poster found
    moviePoster.src = posterUrl;
    moviePoster.alt = `${movie.title} Poster`;
    moviePoster.classList.add("movie-poster");
    movieItem.append(moviePoster);

    // Movie title
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;
    movieItem.append(movieTitle);

    // Movie details
    movieItem.append(createMovieDetail("Episode", movie.episode_id));
    movieItem.append(createMovieDetail("Producer(s)", movie.producer));
    movieItem.append(createMovieDetail("Director", movie.director));
    movieItem.append(createMovieDetail("Release Date", movie.release_date));

    // Opening crawl for movies
    const movieOpeningCrawl = document.createElement("p");
    movieOpeningCrawl.innerHTML = `<strong class="movie-header">Opening Crawl:</strong> ${movie.opening_crawl}`;
    movieItem.append(movieOpeningCrawl);

    moviesList.append(movieItem);
  });

  mainElement.append(moviesList);
} else {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "No movies found";
  mainElement.append(errorMessage);
}

// Event listener for search form
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchQuery = searchForm.querySelector(".search-form__input").value.trim().toLowerCase();

  if (!searchQuery) {
    displayMovies(movieDataArray);
  } else {
    const filteredMovies = movieDataArray.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery)
    );
    displayMovies(filteredMovies);
  }
});
};

// Fetch and display movies when the page loads
export const getMovies = async () => {
try {
  const response = await fetch("https://swapi.py4e.com/api/films/");
  const data = await response.json();
  movieDataArray = data.results;

  // After fetching the movies, display them
  displayMovies(movieDataArray);
} catch (error) {
  console.error("Could not fetch or convert data", error);
}
};
