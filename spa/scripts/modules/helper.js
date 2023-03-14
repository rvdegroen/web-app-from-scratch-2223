// https://www.freecodecamp.org/news/javascript-debounce-example/
// debounce, otherwise everytime you type, it will run the function
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
// shuffle existing array
export function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}
