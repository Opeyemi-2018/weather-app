
// Define an API key for OpenWeatherMap
let apiKey = "de3e6377d674cfd41f65e07f4f5c62e2";

// Get references to DOM elements using their IDs
let weatherData = document.getElementById("weather-data");
let cityInput = document.getElementById("city-input");
let formEl = document.querySelector("form");

// Get a reference to the loader element
let loader = document.querySelector(".loader");

// Add an event listener for form submission
formEl.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the city input
  let cityValue = cityInput.value;

  // Display the loader while fetching data
  loader.style.display = "block";

  // Use setTimeout to delay the execution of getWeatherData function
  setTimeout(() => {
    getWeatherData(cityValue);

    // Hide the loader, display weather data
    loader.style.display = "none";
    weatherData.style.display = "block";
  }, 4000); // Delay for 4 seconds
  cityInput.value = ""; // Clear the input field after submission
});

// Define an asynchronous function to fetch weather data
async function getWeatherData(cityValue) {
  try {
    // Use the Fetch API to make a GET request to the OpenWeatherMap API
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    // Check if the response status is not okay and throw an error if it's not
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the response JSON data
    let data = await response.json();

    // Extract weather information from the JSON data
    let temperature = Math.round(data.main.temp);
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;
    let details = [
      `feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];

    // Update the weather data in the DOM
    weatherData.querySelector(".icon").innerHTML = `<img
   src="http://openweathermap.org/img/wn/${icon}.png"
   alt="Weather icon"
 />`;
   weatherData.querySelector(".city-name").innerHTML = cityValue
    weatherData.querySelector(".temperature").innerHTML = `${temperature}°C`;
    weatherData.querySelector(".description").innerHTML = description;

    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    // Handle errors by clearing and displaying an error message
    weatherData.querySelector(".icon").innerHTML = "";
    weatherData.querySelector(".temperature").innerHTML = "";
    weatherData.querySelector(".description").innerHTML =
      "Opps An error occur!!!";
    weatherData.querySelector(".details").innerHTML = "";
  }
}
