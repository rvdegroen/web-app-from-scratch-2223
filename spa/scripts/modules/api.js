// GET Characters -> https://officeapi.dev/api/characters/
// GET Random Quote -> https://officeapi.dev/api/quotes/random/
const apiBaseUrl = "https://www.officeapi.dev/api";

export async function getRandomQuote() {
  const response = await fetch(`${apiBaseUrl}/quotes/random`);
  const json = await response.json();
  return json.data;
}

export async function getCharacters() {
  const response = await fetch(`${apiBaseUrl}/characters`);
  const json = await response.json();
  return json.data;
}
