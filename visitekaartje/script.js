// Variables
const myMemberUrl = "https://whois.fdnd.nl/api/v1/member?id=cldepct6w3x5w0av02sp6c4gh";
const myMemberUrlSlug = "https://whois.fdnd.nl/api/v1/member/roshnie";
// HTML elements
let $name = document.querySelector(".name");

const writeBusinessCardInfo = async (API) => {
  const response = await fetch(API);
  const json = await response.json();
  const member = json.member;
  console.log(member);
  $name.innerHTML = member.name;
};

writeBusinessCardInfo(myMemberUrl);
