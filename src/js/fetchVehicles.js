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
    "Sail barge": "/assets/vehicles/Sailbarge.jpg"
};

let vehiclesDataArray = [];

// Create bold header and text
function createVehiclesDetail(header, text) {
    const vehicleDetail = document.createElement("p");
    const strongHeader = document.createElement("strong");
    strongHeader.classList.add("vehicles-header");
    strongHeader.textContent = `${header}:`;

    vehicleDetail.appendChild(strongHeader);
    vehicleDetail.appendChild(document.createTextNode(` ${text}`));

    return vehicleDetail;
};

// search bar
function createSearchForm() {
    const searchForm = document.createElement("form");
    searchForm.classList.add("search-form");

    const searchInput = document.createElement("input");
    searchInput.classList.add("search-form__input");
    searchInput.type = "text";
    searchInput.placeholder = "Search for a vehicle...";

    const searchButton = document.createElement("button");
    searchButton.classList.add("search-form__button");
    searchButton.type = "submit";
    searchButton.textContent = "Search";

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);

    return searchForm;
};

// display vehicles
const displayVehicles = (vehiclesData) => {
    const mainElement = document.querySelector("main");
    const vehiclesList = document.createElement("ul");
    vehiclesList.classList.add("vehicles-card__list");

    const searchForm = createSearchForm();
    mainElement.innerHTML = "";
    mainElement.appendChild(searchForm);

    if (vehiclesData.length > 0) {
        vehiclesData.forEach((vehicle) => {
            const vehicleItem = document.createElement("li");
            vehicleItem.classList.add("vehicles-card__item");

            // adding vehicle images
            const vehicleImage = document.createElement("img");
            const vehicleUrl = vehicleImages[vehicle.name];
            vehicleImage.src = vehicleUrl;
            vehicleImage.alt = `${vehicle.name} Poster`;
            vehicleImage.classList.add("vehicles-poster");
            vehicleItem.appendChild(vehicleImage);


            // vehicle name
            const vehicleName = document.createElement("h3");
            vehicleName.textContent = vehicle.name;
            vehicleItem.appendChild(vehicleName);

            // planet detailes
            vehicleItem.appendChild(createVehiclesDetail("Model", vehicle.model));
            vehicleItem.appendChild(createVehiclesDetail("Manufacturer", vehicle.manufacturer));
            vehicleItem.appendChild(createVehiclesDetail("Cost in credits", vehicle.cost_in_credits));
            vehicleItem.appendChild(createVehiclesDetail("Length", vehicle.length));
            vehicleItem.appendChild(createVehiclesDetail("Crew", vehicle.crew));
            vehicleItem.appendChild(createVehiclesDetail("Passengers", vehicle.passengers));
            vehicleItem.appendChild(createVehiclesDetail("Cargo capacity", vehicle.cargo_capacity));
            vehicleItem.appendChild(createVehiclesDetail("Consumables", vehicle.consumables));

            vehiclesList.appendChild(vehicleItem);
        });

        mainElement.append(vehiclesList);
    } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "No vehicles found";
        mainElement.append(errorMessage);
    }

    // event listener for search form
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchQuery = searchForm.querySelector(".search-form__input").value.trim().toLowerCase();

        if (!searchQuery) {
            displayVehicles(vehiclesDataArray);
        } else {
            const filteredVehicles = vehiclesDataArray.filter((vehicle) =>
            vehicle.name.toLowerCase().includes(searchQuery)
        );
        displayVehicles(filteredVehicles);
        }
    });
};

// fetch and display vehicles when page loads
export const getVehicles = async () => {
    try {
        const response = await fetch("https://swapi.py4e.com/api/vehicles/");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        vehiclesDataArray = data.results;

        // display vehicles
        displayVehicles(vehiclesDataArray);

    } catch (error) {
        console.error("could not fetch or convert data", error);
        const mainElement = document.querySelector("main");
            mainElement.innerHTML = `
                <p class="error-message">Failed to load vehicles. Please check your connection and try again later.</p>
            `;
    }
};

  


