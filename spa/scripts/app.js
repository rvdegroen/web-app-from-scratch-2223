import { renderPage } from "./modules/navigation.js";

// Render the new page on navigation
window.onhashchange = () => renderPage();

// Render the correct page initially - required for page refresh to work
renderPage();
