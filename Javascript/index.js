const inputText = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", weather);
function weather() {
  displayTempearture();
}
function displayTempearture() {
  let place = inputText.value;
  async function getWeather() {
    let responseURL = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1`,
    );
    let dataURL = await responseURL.json();
    console.log(dataURL);
    if (inputText.value == "" || !dataURL.results) {
      document.getElementById("wrong").style.display = "inline-block";
      document.getElementById("wrong").textContent = " sorry cannot found it ";
      return;
    }
    let result = dataURL.results[0];
    if (
      result.feature_code !== "PCLI" ||
      result.feature_code.startsWith("PPL")
    ) {
      document.getElementById("wrong").style.display = "inline-block";
      document.getElementById("wrong").textContent = "Location is not found";
      return;
    }
    let longitude = dataURL.results[0].longitude;
    let latitude = dataURL.results[0].latitude;
    let weatherURL = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
    );
    let weatherData = await weatherURL.json();
    console.log(weatherData);
    const temperature = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const windSpeed = weatherData.current.wind_speed_10m;
    document.getElementById("weather").innerHTML =
      `<p class="country-name">${place} 
        ${temperature}${
          weatherData.current_units.temperature_2m
        }${humidity}${weatherData.current_units.relative_humidity_2m}${windSpeed}
        ${weatherData.current_units.wind_speed_10m}</p> `;
  }
  getWeather();
}
