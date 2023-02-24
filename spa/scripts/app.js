// Variables
// global so I can change the api easily
const myApi = "https://www.officeapi.dev/api/";
// global because it's an eventlistener in global scope
const $paper = document.querySelector(".paper-stack");

// fetch a random quote
const getQuote = async (api) => {
  try {
    // $ stands for html variables -> easier to recognize
    const $quote = document.querySelector("blockquote");
    const $firstName = document.querySelector("span:nth-of-type(1)");
    const $surname = document.querySelector("span:nth-of-type(2)");

    // fetch random quote
    const quote = await (await fetch(api + "quotes/random")).json();
    console.log(quote);

    // fetch random character
    const character = await (await fetch(api + "characters/random")).json();
    console.log(character);

    // write data in html
    $quote.textContent = quote.data.content;
    $firstName.textContent = quote.data.character.firstname;
    $surname.textContent = quote.data.character.lastname;
  } catch (error) {
    console.error(error);
  }
};

// calling functions
getQuote(myApi);

// eventlisteners
// When I click, the arrow functuon runs getQuote
// if I didn't use a param, I could just use getQuote as 2nd param
$paper.addEventListener("click", () => getQuote(myApi));
