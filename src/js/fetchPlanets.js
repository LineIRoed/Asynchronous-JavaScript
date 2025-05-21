// Get planet images
const planetImages = {
    "Tatooine": "/assets/planets/Tatooine.jpg",
    "Alderaan": "/assets/planets/Alderaan.jpg",
    "Yavin IV": "/assets/planets/YavinIV.jpg",
    "Hoth": "/assets/planets/Hoth.jpg",
    "Dagobah": "/assets/planets/Dagobah.jpg",
    "Bespin": "/assets/planets/Bespin.jpg",
    "Endor": "/assets/planets/Endor.jpg",
    "Naboo": "/assets/planets/Naboo.jpg",
    "Coruscant": "/assets/planets/Coruscant.jpg",
    "Kamino": "/assets/planets/Kamino.jpg",
};

let planetsDataArray = [];

// Create bold header and text
function createPlanetsDetail(header, text) {
    const planetDetail = document.createElement("p");
    const strongHeader = document.createElement("strong");
    strongHeader.classList.add("planets-header");
    strongHeader.textContent = `${header}:`;

    planetDetail.appendChild(strongHeader);
    planetDetail.appendChild(document.createTextNode(` ${text}`));

    return planetDetail;
}

// Search bar
function createSearchForm() {
    const searchForm = document.createElement("form");
    searchForm.classList.add("search-form");
  
    const searchInput = document.createElement("input");
    searchInput.classList.add("search-form__input");
    searchInput.type = "text";
    searchInput.placeholder = "Search for a planet...";
  
    const searchButton = document.createElement("button");
    searchButton.classList.add("search-form__button");
    searchButton.type = "submit";
    searchButton.textContent = "Search";
  
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
  
    return searchForm;
  };

  // display planets
  const displayPlanets = (planetsData) => {
    const mainElement = document.querySelector("main");
    const planetsList = document.createElement("ul");
    planetsList.classList.add("planets-card__list");

    const searchForm = createSearchForm();
    mainElement.innerHTML = ""; 
    mainElement.appendChild(searchForm);

    if (planetsData.length > 0) {
        planetsData.forEach((planet) => {
            const planetItem = document.createElement("li");
            planetItem.classList.add("planets-card__item");

            //add planet image
            const planetImage = document.createElement("img");
            const planetUrl = planetImages[planet.name];
            planetImage.src = planetUrl;
            planetImage.alt = `${planet.name} Poster`;
            planetImage.classList.add("planets-poster");
            planetItem.appendChild(planetImage);

            // planet name
            const planetName = document.createElement("h3");
            planetName.textContent = planet.name;
            planetItem.appendChild(planetName);

            // planet detailes
            planetItem.appendChild(createPlanetsDetail("Climate", planet.climate));
            planetItem.appendChild(createPlanetsDetail("Terrain", planet.terrain));
            planetItem.appendChild(createPlanetsDetail("Diameter", planet.diameter));
            planetItem.appendChild(createPlanetsDetail("Surface Water", planet.surface_water));

            planetsList.appendChild(planetItem);
        });

        mainElement.append(planetsList);
    } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "No planets found";
        mainElement.append(errorMessage);
    }

    // event listener for search form
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchQuery = searchForm.querySelector(".search-form__input").value.trim().toLowerCase();

        if (!searchQuery) {
            displayPlanets(planetsDataArray);
        } else {
            const filteredPlanets = planetsDataArray.filter((planet) => 
            planet.name.toLowerCase().includes(searchQuery)
        );
        displayPlanets(filteredPlanets);
        }
    });
  };

  // fetch and display planets when page loads
  export const getPlanet = async () => {
    try {
        const response = await fetch("https://swapi.py4e.com/api/planets/");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const data = await response.json();
        planetsDataArray = data.results;

        // display planets
        displayPlanets(planetsDataArray);

    } catch (error) {
        console.error("could not fetch or convert data", error); 
        const mainElement = document.querySelector("main");
            mainElement.innerHTML = `
                <p class="error-message">Failed to load planets. Please check your connection and try again later.</p>
            `;
        }
  };

  