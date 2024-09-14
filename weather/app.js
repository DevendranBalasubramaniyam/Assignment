let placename = document.querySelector('#sec');
let container = document.querySelector('#container');

document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    let location = placename.value;
    if (!location) {
        alert("Please enter a city name.");
        return;
    }

    getDetails(location);
});

async function getDetails(location) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=78d693268094356f28ec0321bfb8171d&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`City not found: ${location}`);
        }
        const data = await response.json();
        renderContent(data);
    } catch (error) {
        alert(error.message);
    }
}

function renderContent(data) {
    let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    const html = `
        <h1>${data.name}</h1>
        <p style="color:#ffcc00; font-size:29px;">Temperature: ${data.main.temp}°C <span class="material-symbols-outlined">thermostat</span></p>
        <p style="color:#ffcc00; font-size:29px;">Weather: ${data.weather[0].description} <span class="material-symbols-outlined">cloud</span></p>
        <p style="color:#ffcc00; font-size:29px;">Sunrise: ${sunriseTime} <span class="material-symbols-outlined">wb_twilight</span></p>
        <p style="color:#ffcc00; font-size:29px;">Sunset: ${sunsetTime} <span class="material-symbols-outlined">night_sight_max</span></p>
        <p style="color:#ffcc00; font-size:29px;">Humidity: ${data.main.humidity}% <span class="material-symbols-outlined">humidity_low</span></p>
    `;
    container.innerHTML = html;
}
