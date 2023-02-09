// give temporarily access on https://cors-anywhere.herokuapp.com/corsdemo
const squadUrl =
  "https://cors-anywhere.herokuapp.com/https://whois.fdnd.nl/api/v1/squad?id=cldcspecf0z0o0bw59l8bwqim";

// myData returns everything of the API, squad returns all the data of the squad, members returns all the member data, since I have an index number of 20, I use [20]
const myData = fetch(squadUrl)
  .then((response) => response.json())
  .then((myData) => console.log(myData.squad.members[20]));

// const transformHTML = () => {};
