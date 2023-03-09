// GET Characters -> https://officeapi.dev/api/characters/
// GET Random Quote -> https://officeapi.dev/api/quotes/random/
const apiBaseUrl = "https://www.officeapi.dev/api";

const routes = {
  "/": {
    element: "pageHome",
    init: () => {},
  },
  "/game": {
    element: "pageGame",
    init: initGame,
  },
  "/characters": {
    element: "pageCharacters",
    init: initCharacters,
  },
};

// https://www.freecodecamp.org/news/javascript-debounce-example/
function debounce(func, timeout = 300) {
  console.log("DEBOUNCE");
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

// https://stackoverflow.com/a/38571132/4409162
function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

async function initGame() {
  const $quote = document.getElementById("game__quote");
  $quote.innerHTML = "";
  const $choices = document.getElementById("game__choices");
  $choices.innerHTML = "";

  const characters = await getCharacters();
  const quote = await getRandomQuote();

  const speaker = `${quote.character.firstname} ${quote.character.lastname}`;
  const remainingCharacters = characters
    .map((character) => `${character.firstname} ${character.lastname}`)
    .filter((character) => character !== speaker);

  const wrongChoices = shuffleArray(remainingCharacters).slice(0, 3);

  const choices = shuffleArray([speaker, ...wrongChoices]);

  $quote.innerHTML = `
    <p>"${quote.content}"</p>
  `;

  for (const choice of choices) {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => {
      if (choice === speaker) {
        alert("Correct!");
      } else {
        alert("Wrong!");
      }
      initGame();
    });
    $choices.appendChild(button);
  }
}

async function initCharacters() {
  updateCharactersTable();

  const $filterInput = document.getElementById("characters__filter");
  $filterInput.addEventListener(
    "input",
    debounce((e) => updateCharactersTable(e.target.value))
  );

  const $sortAsc = document.getElementById("characters__sortAsc");
  $sortAsc.addEventListener("click", () => updateCharactersTable($filterInput.value, "asc"));

  const $sortDesc = document.getElementById("characters__sortDesc");
  $sortDesc.addEventListener("click", () => updateCharactersTable($filterInput.value, "desc"));
}

async function updateCharactersTable(filter = null, sortDirection = null) {
  const $table = document.getElementById("characters__tbody");
  $table.innerHTML = "";

  let characters = await getCharacters();

  if (filter) {
    characters = characters.filter(
      (character) =>
        character.firstname.toLowerCase().includes(filter.toLowerCase()) ||
        character.lastname.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // https://stackoverflow.com/a/45544166/4409162
  if (sortDirection) {
    characters = characters.sort((a, b) =>
      sortDirection === "asc"
        ? a.firstname.localeCompare(b.firstname)
        : b.firstname.localeCompare(a.firstname)
    );
  }

  for (const character of characters) {
    const row = document.createElement("tr");

    const firstName = document.createElement("td");
    firstName.textContent = character.firstname;
    row.appendChild(firstName);

    const lastName = document.createElement("td");
    lastName.textContent = character.lastname;
    row.appendChild(lastName);

    $table.appendChild(row);
  }
}

async function getRandomQuote() {
  const response = await fetch(`${apiBaseUrl}/quotes/random`);
  const json = await response.json();
  return json.data;
}

async function getCharacters() {
  const response = await fetch(`${apiBaseUrl}/characters`);
  const json = await response.json();
  return json.data;
}

function getPath() {
  // localhost:3000 -> ""
  // localhost:3000/ -> ""
  // localhost:300/# -> ""
  // localhost:3000/#/ -> "#/"
  // localhost:3000/#/about -> #/about
  const hash = window.location.hash;

  if (hash === "") {
    return "/";
  }

  return hash.slice(1);
}

function renderPage() {
  const pages = document.querySelectorAll(".page");

  // Hide all pages
  for (const page of pages) {
    if (!page.classList.contains("hidden")) {
      page.classList.add("hidden");
    }
  }

  // Show correct page
  const path = getPath();
  const route = routes[path];
  const page = document.getElementById(route.element);
  page.classList.remove("hidden");
  route.init();
}

// Render the new page on navigation
window.onhashchange = () => renderPage();

// Render the correct page initially - required for page refresh to work
renderPage();
