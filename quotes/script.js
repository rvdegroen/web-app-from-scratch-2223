// Variables
const myApi = "https://www.officeapi.dev/api/quotes/random";

// fetch all quotes
getQuote = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);
};

getQuote(myApi);

//fetch("https://officeapi.dev/api/quotes/random")
//  .then((response) => response.json())
//  .then((data) => console.log(data))
//  .catch((error) => console.error(error));
