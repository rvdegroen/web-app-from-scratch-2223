import { getCharacters, getRandomQuote } from "./api.js";
import { shuffleArray } from "./helper.js";

export async function initGame() {
  const $quote = document.getElementById("game__quote");
  $quote.innerHTML = "";

  try {
    const $choices = document.getElementById("game__choices");
    $choices.innerHTML = "";

    const characters = await getCharacters();
    const quote = await getRandomQuote();

    const speaker = `${quote.character.firstname} ${quote.character.lastname}`;
    const remainingCharacters = characters
      // takes object and turns into string
      .map((character) => `${character.firstname} ${character.lastname}`)
      // remaining characters do not include the one who spoke the quote
      .filter((character) => character !== speaker);
    // 3 wrong choices: remaining characters, shuffle it and take the first 3 remaining/random characters
    const wrongChoices = shuffleArray(remainingCharacters).slice(0, 3);
    // make a new array with the speaker and 3 wrong choices and shuffle it
    const choices = shuffleArray([speaker, ...wrongChoices]);

    $quote.innerHTML = `
		  <p>"${quote.content}"</p>
		`;
    // use the choices to make the buttons
    for (const choice of choices) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", () => {
        if (choice === speaker) {
          alert("Correct!");
        } else {
          alert("Wrong!");
        }
        //   run the game again
        initGame();
      });
      $choices.appendChild(button);
    }
  } catch (err) {
    $quote.innerHTML = `<p style="color: red">Error!</p>`;
  }
}
