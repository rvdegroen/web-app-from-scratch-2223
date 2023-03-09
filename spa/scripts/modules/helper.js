// https://www.freecodecamp.org/news/javascript-debounce-example/
export function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

// https://stackoverflow.com/a/38571132/4409162
export function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}
