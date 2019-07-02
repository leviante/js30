const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

//get all data from API into an array
const cities = [];

//use fetch - vanilla JS soluton to axios or jQuery

/*
What fetch does is it returns a "promise"
to work with that promise we use .then
.then works with each item we called blob and it is called a "response"
if we console.log each response, we get shit data
BECAUSE the data that comes back from fetch, it doesn't know what kind of data it is just yet.
It could be img, html, music
We just know that it is a JSON
so why not use JSON.parse(blob)?

BECAUSE the blob has to be converted from raw data to JSON

How to convert response ?
use .json() method on each response -> but this will return ANOTHER PROMISE so
we have to use .then with that promise as well
now we have the raw data -> we need to put it inside our const cities array
1. turn const into let and say data = cities
2. if you want to keep const, you need to use spread operator to extract every single item in that array and insert those items as an argument inside the push method
push method adds every item to the const
if you just push data that'd be nesting -> cities has 1 element and that's the data array we pushed
*/

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    //figure out if the city or state matches with what's searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArr = findMatches(this.value, cities);
  const html = matchArr
    .map(place => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
        <li>
            <span class='name'>${cityName},  ${stateName}</span>
            <span class='population'>${numberWithCommas(
              place.population
            )}</span>
        </li>
      `;
    })
    .join("");

  suggestion.innerHTML = html;
}

//grab input
const searchInput = document.querySelector(".search");
const suggestion = document.querySelector(".suggestions");

searchInput.addEventListener("input", displayMatches);
