// Variables
const myMemberUrl = "https://whois.fdnd.nl/api/v1/member?id=cldepct6w3x5w0av02sp6c4gh";
const myMemberUrlSlug = "https://whois.fdnd.nl/api/v1/member/roshnie";
// HTML elements
let $name = document.querySelector(".name");

const writeBusinessCardInfo = async (API) => {
  const myData = await fetch(API)
    .then((response) => response.json())
    .then((myData) => myData.member);
  console.log(myData);
  $name.innerHTML = myData.name;
};

writeBusinessCardInfo(myMemberUrl);
