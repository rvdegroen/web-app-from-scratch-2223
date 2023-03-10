import { getCharacters } from "./api.js";
import { debounce } from "./helper.js";

export async function initCharacters() {
  updateCharactersTable();
  // input event runs when you input smthn
  const $filterInput = document.getElementById("characters__filter");
  $filterInput.addEventListener(
    "input",
    // debounce runs the function updatechar
    // event.target = input field
    // value is whatever u put in there
    debounce((e) => updateCharactersTable(e.target.value))
  );

  //   sort button
  const $sortAsc = document.getElementById("characters__sortAsc");
  //   the first param in updatechar is the filter, 2nd param is how to sort it
  $sortAsc.addEventListener("click", () => updateCharactersTable($filterInput.value, "asc"));

  //   sort button
  const $sortDesc = document.getElementById("characters__sortDesc");
  $sortDesc.addEventListener("click", () => updateCharactersTable($filterInput.value, "desc"));
}

async function updateCharactersTable(filter = null, sortDirection = null) {
  const $table = document.getElementById("characters__tbody");
  $table.innerHTML = "";

  let characters = await getCharacters();

  if (filter) {
    // using filter, to filter the characters
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
        ? //   localecompare looks at the comparison with strings, result will be -1, 0, 1
          // array has a and b [1,2,3] a=1 b=2 => how do you want to compare this?
          //   asc = 1
          a.firstname.localeCompare(b.firstname)
        : //   desc = -1
          b.firstname.localeCompare(a.firstname)
    );
  }

  //   generating html
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
