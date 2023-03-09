import { getCharacters, getRandomQuote } from "./api.js";
import { shuffleArray } from "./helper.js";

export async function initGame() {
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
