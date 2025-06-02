// Get vehicle images
const vehicleImages = {
    "Sand Crawler": "/assets/vehicles/Sandcrawler.jpg",
    "T-16 skyhopper": "/assets/vehicles/T-16skyhopper.jpg",
    "X-34 landspeeder": "/assets/vehicles/X-34landspeeder.jpg",
    "TIE/LN starfighter": "/assets/vehicles/TIELNstarfighter.jpg",
    "Snowspeeder": "/assets/vehicles/Snowspeeder.jpg",
    "TIE bomber": "/assets/vehicles/TIEbomber.jpg",
    "AT-AT": "/assets/vehicles/AT-AT.jpg",
    "AT-ST": "/assets/vehicles/AT-ST.jpg",
    "Storm IV Twin-Pod cloud car": "/assets/vehicles/StormIVTwin-Podcloudcar.jpg",
    "Sail barge": "/assets/vehicles/Sailbarge.jpg",
  };
  
  let vehiclesDataArray = [];
  
  // Create bold header and text for vehicle details
  function createVehicleDetail(header, text) {
    const detail = document.createElement("p");
    const strongHeader = document.createElement("strong");
    strongHeader.classList.add("vehicles-header");
    strongHeader.textContent = `${header}:`;
  
    detail.appendChild(strongHeader);
    detail.appendChild(document.createTextNode(` ${text}`));
    return detail;
  }
  
  // Create search form
  function createSearchForm() {
    const form = document.createElement("form");
    form.classList.add("search-form");
  
    const input = document.createElement("input");
    input.classList.add("search-form__input");
    input.type = "text";
    input.placeholder = "Search for a vehicle...";
  
    const button = document.createElement("button");
    button.classList.add("search-form__button");
    button.type = "submit";
    button.textContent = "Search";
  
    form.appendChild(input);
    form.appendChild(button);
  
    return form;
  }
  
  // Display vehicles on the page
  const displayVehicles = (vehiclesData) => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
  
    const searchForm = createSearchForm();
    mainElement.appendChild(searchForm);
  
    if (vehiclesData.length > 0) {
      const list = document.createElement("ul");
      list.classList.add("vehicles-card__list");
  
      vehiclesData.forEach(vehicle => {
        const item = document.createElement("li");
        item.classList.add("vehicles-card__item");
  
        // Vehicle image
        const img = document.createElement("img");
        const imgSrc = vehicleImages[vehicle.name];
        img.src = imgSrc;
        img.alt = `${vehicle.name} Poster`;
        img.classList.add("vehicles-poster");
        item.appendChild(img);
  
        // Vehicle name
        const title = document.createElement("h3");
        title.textContent = vehicle.name;
        item.appendChild(title);
  
        // Vehicle details
        item.appendChild(createVehicleDetail("Model", vehicle.model));
        item.appendChild(createVehicleDetail("Manufacturer", vehicle.manufacturer));
        item.appendChild(createVehicleDetail("Cost in credits", vehicle.cost_in_credits));
        item.appendChild(createVehicleDetail("Length", vehicle.length));
        item.appendChild(createVehicleDetail("Crew", vehicle.crew));
        item.appendChild(createVehicleDetail("Passengers", vehicle.passengers));
        item.appendChild(createVehicleDetail("Cargo capacity", vehicle.cargo_capacity));
        item.appendChild(createVehicleDetail("Consumables", vehicle.consumables));
  
        list.appendChild(item);
      });
  
      mainElement.appendChild(list);
    } else {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "No vehicles found";
      mainElement.appendChild(errorMessage);
    }
  
    // Search event listener
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchForm.querySelector(".search-form__input").value.trim().toLowerCase();
  
      if (!query) {
        displayVehicles(vehiclesDataArray);
      } else {
        const filtered = vehiclesDataArray.filter(vehicle =>
          vehicle.name.toLowerCase().includes(query)
        );
        displayVehicles(filtered);
      }
    });
  };
  
  // Fetch and display vehicles on page load
  export const getVehicles = async () => {
    try {
      const response = await fetch("https://swapi.py4e.com/api/vehicles/");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      vehiclesDataArray = data.results;
  
      displayVehicles(vehiclesDataArray);
    } catch (error) {
      console.error("Could not fetch or convert data", error);
      const mainElement = document.querySelector("main");
      mainElement.innerHTML = `
        <p class="error-message">Failed to load vehicles. Please check your connection and try again later.</p>
      `;
    }
  };
  