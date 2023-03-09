import { getCharacters } from "./api.js";
import { debounce } from "./helper.js";

export async function initCharacters() {
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
