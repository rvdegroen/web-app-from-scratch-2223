import { initCharacters } from "./characters.js";
import { initGame } from "./game.js";

// source: https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh
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

export function renderPage() {
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
