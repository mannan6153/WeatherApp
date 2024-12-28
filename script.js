const apikey = "21d0a2b9b2d6c28a67d91edb64dd8686";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            alert("City not found!");
            return;
        }
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 3.6) + " km/h";

        if (data.weather[0].main === "Clouds") {
            weathericon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weathericon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weathericon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weathericon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weathericon.src = "images/mist.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data.");
    }
}

searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});

// Add event listener for the Enter key press
searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkweather(searchBox.value);
    }
});
