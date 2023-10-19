let apiKey = "de3e6377d674cfd41f65e07f4f5c62e2";
let weatherData = document.getElementById("weather-data");
let cityInput = document.getElementById("city-input");
let formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let cityValue = cityInput.value;
  getWeatherData(cityValue);
  cityInput.value = "";
});

async function getWeatherData(cityValue) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    console.log(data);
    let temperature = Math.round(data.main.temp);
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;
    let details = [
      `feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];

    weatherData.querySelector(".icon").innerHTML = `<img
   src="http://openweathermap.org/img/wn/${icon}.png"
   alt="Weather icon"
 />`;

    weatherData.querySelector(".temperature").innerHTML = `${temperature}°C`;
    weatherData.querySelector(".description").innerHTML = description;

    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";

    weatherData.querySelector(".temperature").innerHTML = "";
    weatherData.querySelector(".description").innerHTML =
      "Opps An error occur!!!";

    weatherData.querySelector(".details").innerHTML = "";
  }
}
