const apiKey = "084c5a877e8e980a52e5ed118d2f005a";

async function fetchWeather() {
  const locationInput = document.getElementById("locationInput").value.trim();

  if (!locationInput) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found. Please try again.");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert(error.message);
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to fetch weather data.");

          const data = await response.json();
          displayWeather(data);
        } catch (error) {
          console.error("Error fetching location-based weather:", error);
          alert("Error fetching your location weather.");
        }
      },
      (error) => {
        alert("Geolocation error: Please allow location access.");
        console.error("Geolocation error:", error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = `
    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
    <p>🌡️ Temperature: ${data.main.temp}°C</p>
    <p>🌤️ Condition: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
  `;
}
