import { initCharacters } from "./characters.js";
import { initGame } from "./game.js";

// source: https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh
// object of routes, when element is element, init function runs, first init is empty
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

// get path without the # and returns a string
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

// function on what to hide and what to show
export function renderPage() {
  const pages = document.querySelectorAll(".page");

  // Hide all pages
  for (const page of pages) {
    if (!page.classList.contains("hidden")) {
      page.classList.add("hidden");
    }
  }

  // Show correct page
  // get the string from getpath into path
  const path = getPath();
  // a variable cannot have slash, so you can use [] / or access property of object
  // routes/home for example
  const route = routes[path];
  const page = document.getElementById(route.element);
  page.classList.remove("hidden");
  // routes/path => runs different init function and decides which page it will show
  // routes.home or routes.game etc
  route.init();
}
