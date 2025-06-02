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
    "Kamino": "/assets/planets/Kamino.jpg"
  };
  
  let planetsDataArray = [];
  
  // Create bold header and text for each detail
  function createPlanetDetail(header, text) {
    const detail = document.createElement("p");
    const strongHeader = document.createElement("strong");
    strongHeader.classList.add("planets-header");
    strongHeader.textContent = `${header}:`;
  
    detail.appendChild(strongHeader);
    detail.appendChild(document.createTextNode(` ${text}`));
  
    return detail;
  }
  
  // Reusable search form
  function createSearchForm(placeholder = "Search...") {
    const form = document.createElement("form");
    form.classList.add("search-form");
  
    const input = document.createElement("input");
    input.classList.add("search-form__input");
    input.type = "text";
    input.placeholder = placeholder;
  
    const button = document.createElement("button");
    button.classList.add("search-form__button");
    button.type = "submit";
    button.textContent = "Search";
  
    form.appendChild(input);
    form.appendChild(button);
  
    return form;
  }
  
  // Display planets
  const displayPlanets = (planetsData) => {
    const main = document.querySelector("main");
    const planetList = document.createElement("ul");
    planetList.classList.add("planets-card__list");
  
    const searchForm = createSearchForm("Search for a planet...");
    main.innerHTML = "";
    main.appendChild(searchForm);
  
    if (planetsData.length > 0) {
      planetsData.forEach((planet) => {
        const listItem = document.createElement("li");
        listItem.classList.add("planets-card__item");
  
        const planetImage = document.createElement("img");
        planetImage.src = planetImages[planet.name];
        planetImage.alt = `${planet.name} Image`;
        planetImage.classList.add("planets-poster");
        listItem.appendChild(planetImage);
  
        const name = document.createElement("h3");
        name.textContent = planet.name;
        listItem.appendChild(name);
  
        listItem.appendChild(createPlanetDetail("Climate", planet.climate));
        listItem.appendChild(createPlanetDetail("Terrain", planet.terrain));
        listItem.appendChild(createPlanetDetail("Diameter", planet.diameter));
        listItem.appendChild(createPlanetDetail("Surface Water", planet.surface_water));
  
        planetList.appendChild(listItem);
      });
  
      main.appendChild(planetList);
    } else {
      const message = document.createElement("p");
      message.textContent = "No planets found.";
      main.appendChild(message);
    }
  
    // Add search functionality
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchForm.querySelector(".search-form__input").value.trim().toLowerCase();
  
      if (!query) {
        displayPlanets(planetsDataArray);
      } else {
        const filtered = planetsDataArray.filter((planet) =>
          planet.name.toLowerCase().includes(query)
        );
        displayPlanets(filtered);
      }
    });
  };
  
  // Fetch planets from API
  export const getPlanet = async () => {
    try {
      const response = await fetch("https://swapi.py4e.com/api/planets/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      planetsDataArray = data.results;
      displayPlanets(planetsDataArray);
  
    } catch (error) {
      console.error("Could not fetch or convert data", error);
      const main = document.querySelector("main");
      main.innerHTML = `
        <p class="error-message">Failed to load planets. Please check your connection and try again later.</p>
      `;
    }
  };
  