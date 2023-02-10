// give temporarily access on https://cors-anywhere.herokuapp.com/corsdemo
const squadUrl =
  "https://cors-anywhere.herokuapp.com/https://whois.fdnd.nl/api/v1/squad?id=cldcspecf0z0o0bw59l8bwqim";
let $name = document.querySelector(".name");

// myData returns everything of the API, squad returns all the data of the squad, members returns all the member data, since I have an index number of 20, I use [20]
const writeBusinessCardInfo = async (API) => {
  const myData = await fetch(API)
    .then((response) => response.json())
    .then((myData) => myData.squad.members[20]);
  console.log(myData);
  $name.innerHTML = myData.name;
};

writeBusinessCardInfo(squadUrl);
// const transformHTML = () => {};
