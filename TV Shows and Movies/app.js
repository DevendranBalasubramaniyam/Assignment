let search = document.querySelector('#sec');
let container = document.querySelector('#container');
let time = document.querySelector('#year');
let length = document.querySelector("#plot");
document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    let n = 1;
    n++;
    let moviename = search.value;
    let year = time.value;
    let country = length.value;
    getDetails(moviename, year, country, n);
});

async function getDetails(moviename, year, country, n) {
    let apikey = '7a3e52eb8054ffc3c480637daac27a1c';
    let apiUrl = `https://api.themoviedb.org/3/search/movie?query=${moviename}&include_adult=true&language=all&primary_release_year=${year}&page=${n}&region=${country}&api_key=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderContent(data);
    console.log(data);
}
function renderContent(data) {
const includedKeys = ['original_budget', 'original_air_date', 'overview', 'production_code', 'title'];
container.innerHTML = ''; 

if (data.results.length === 0) {
const message = document.createElement('p');
message.textContent = "I can't find any movies.";
container.appendChild(message);
} else {
data.results.forEach(movie => {
    const movieDiv = document.createElement('div');
    let hasContent = false;
    includedKeys.forEach(key => {
        if (movie[key] !== undefined) {
            hasContent = true;
            const p = document.createElement('p');
            p.innerHTML = `<span style="color: #00ccff;">${key}:</span> <span style="color: #ffcc00;">${movie[key]}</span>`;
            movieDiv.appendChild(p);
        }
    });
    if (hasContent) {
        container.appendChild(movieDiv);
    } else {
        const message = document.createElement('p');
        message.textContent = `I can't find ${movie.title}`;
        container.appendChild(message);
    }
});
}
}