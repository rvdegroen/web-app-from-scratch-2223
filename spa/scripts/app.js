// Variables
const myApi = "https://www.officeapi.dev/api/quotes/random/";
const $paper = document.querySelector(".paper-stack");

// fetch a random quote
const getQuote = async (api) => {
  try {
    // variables
    const $quote = document.querySelector("blockquote");
    const $firstName = document.querySelector(".first-name");
    const $surname = document.querySelector(".surname");

    const response = await fetch(api);
    const data = await response.json();
    console.log(data);

    // write data in html
    $quote.textContent = data.data.content;
    $firstName.textContent = data.data.character.firstname;
    $surname.textContent = data.data.character.lastname;
  } catch (error) {
    console.error(error);
  }
};

getQuote(myApi);
// When I click, the arrow functuon runs getQuote
// if I didn't use a param, I could just use getQuote as 2nd param
$paper.addEventListener("click", () => getQuote(myApi));

//fetch("https://officeapi.dev/api/quotes/random")
//  .then((response) => response.json())
//  .then((data) => console.log(data))
//  .catch((error) => console.error(error));
