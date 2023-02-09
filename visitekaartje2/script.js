// hamburger menu HTML
const toggleButton = document.getElementById("toggle");
const navBarLinks = document.getElementsByClassName("navbar-links");
// give temporarily access on https://cors-anywhere.herokuapp.com/corsdemo
const squadUrl =
  "https://cors-anywhere.herokuapp.com/https://whois.fdnd.nl/api/v1/squad?id=cldcspecf0z0o0bw59l8bwqim";

// hamburger menu
// getElementsByClassName returns a HTMLCollection , not a single element, so you will need to reference the specific element you want to add the event listener to before you can call the
toggleButton.addEventListener("click", () => {
  for (var i = 0; i < navBarLinks.length; i++) {
    navBarLinks[i].classList.toggle("active");
  }
});

// myData returns everything of the API, squad returns all the data of the squad, members returns all the member data, since I have an index number of 20, I use [20]
const myData = fetch(squadUrl)
  .then((response) => response.json())
  .then((myData) => console.log(myData.squad.members[20]));

const transformHTML = () => {};

// find my memberData
// my id: cldepct6w3x5w0av02sp6c4gh

// find my data with my ID
// const myData = array.find((memberData) => obj.memberData === cldepct6w3x5w0av02sp6c4gh);

// console.log(myData);
