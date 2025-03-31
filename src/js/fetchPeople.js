const characterPosters = {
  "Luke Skywalker": "/assets/characters/luke-skywalker.jpg",
  "C-3PO": "/assets/characters/c-3po.jpg",
  "R2-D2": "/assets/characters/r2-d2.jpg",
  "Darth Vader": "/assets/characters/DarthVader.jpg",
  "Leia Organa": "/assets/characters/LeiaOrgana.jpg",
  "Owen Lars": "/assets/characters/OwenLars.jpg",
  "Beru Whitesun lars": "/assets/characters/BeruWhitesunlars.jpg",
  "R5-D4": "/assets/characters/R5-D4.jpg",
  "Biggs Darklighter": "/assets/characters/BiggsDarklighter.jpg",
  "Obi-Wan Kenobi": "/assets/characters/Obi-WanKenobi.jpg",
};

let peopleDataArray = [];

// Function to create character detail (with bold header)
function createCharacterDetail(header, text) {
  const characterDetail = document.createElement("p");
  const strongHeader = document.createElement("strong");
  strongHeader.classList.add("character-header");
  strongHeader.textContent = `${header}:`;

  characterDetail.appendChild(strongHeader);
  characterDetail.appendChild(document.createTextNode(` ${text}`));

  return characterDetail;
};

// Create search form similar to the movie search form
function createSearchForm() {
  const searchForm = document.createElement("form");
  searchForm.classList.add("search-form");

  const searchInput = document.createElement("input");
  searchInput.classList.add("search-form__input");
  searchInput.type = "text";
  searchInput.placeholder = "Search for a character...";

  const searchButton = document.createElement("button");
  searchButton.classList.add("search-form__button");
  searchButton.type = "submit";
  searchButton.textContent = "Search";

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchButton);

  return searchForm;
}

// Function to display characters
const displayCharacters = (charactersData) => {
  const mainElement = document.querySelector("main");
  const charactersList = document.createElement("ul");
  charactersList.classList.add("character-card__list");

  const searchForm = createSearchForm();
  mainElement.innerHTML = ""; // Clear any existing content
  mainElement.appendChild(searchForm); // Add search form to main element

  if (charactersData.length > 0) {
    charactersData.forEach((character) => {
      const characterItem = document.createElement("li");
      characterItem.classList.add("character-card__item");

      // Add character image
      const characterImage = document.createElement("img");
      const imageUrl = characterPosters[character.name] || "../assets/characters/default.jpg"; // Fallback to default image
      characterImage.src = imageUrl;
      characterImage.alt = `${character.name} Poster`;
      characterImage.classList.add("character-poster");
      characterItem.appendChild(characterImage);

      // Add character name
      const characterName = document.createElement("h3");
      characterName.textContent = character.name;
      characterItem.appendChild(characterName);

      // Add character details
      characterItem.appendChild(createCharacterDetail("Height", character.height));
      characterItem.appendChild(createCharacterDetail("Eye color", character.eye_color));
      characterItem.appendChild(createCharacterDetail("Gender", character.gender));
      characterItem.appendChild(createCharacterDetail("Birth Year", character.birth_year));
      characterItem.appendChild(createCharacterDetail("Hair color", character.hair_color));
      characterItem.appendChild(createCharacterDetail("Skin color", character.skin_color));

      charactersList.appendChild(characterItem);
    });

    mainElement.append(charactersList);
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "No characters found";
    mainElement.append(errorMessage);
  }

  // Event listener for search form
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchQuery = searchForm.querySelector(".search-form__input").value.trim().toLowerCase();

    if (!searchQuery) {
      displayCharacters(peopleDataArray); // Show all characters if search query is empty
    } else {
      const filteredCharacters = peopleDataArray.filter((character) =>
        character.name.toLowerCase().includes(searchQuery)
      );
      displayCharacters(filteredCharacters);
    }
  });
};

// Fetch and display characters when the page loads
export const getPeople = async () => {
  try {
    const response = await fetch("https://swapi.py4e.com/api/people/");
    const data = await response.json();
    peopleDataArray = data.results;

    // After fetching the characters, display them
    displayCharacters(peopleDataArray);
  } catch (error) {
    console.error("Could not fetch or convert data", error);
  }
};
