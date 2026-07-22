const inputText = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", weather);
inputText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    weather();
  }
});
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
    if (inputText.value == "" || !dataURL.results) {
      document.getElementById("wrong").style.display = "inline-block";
      document.getElementById("wrong").textContent = " sorry cannot found it ";
      return;
    } else {
      document.getElementById("wrong").style.display = "none";
    }
    let result = dataURL.results[0];
    if (
      result.feature_code !== "PCLI" &&
      !result.feature_code.startsWith("PPL")
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
    const temperature = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const windSpeed = weatherData.current.wind_speed_10m;
    document.getElementById("weather").innerHTML = `<div class="country-name">
      <div class="temperature"> 
      ${place} 
       <p class="temperature">
        ${Math.round(temperature)}
         ${weatherData.current_units.temperature_2m} 
         </p>
       </div>
       <div class="data">
       <div class="humidity">
      <img src="https://cdn-icons-png.flaticon.com/512/728/728093.png" id="humidity_image">
       <p>${humidity}${weatherData.current_units.relative_humidity_2m}</p>
       <p>Humidity</p> 
       </div>
       <div class="wind">
        <img src="https://img.pikbest.com/origin/09/28/64/93xpIkbEsTK9G.png!sw800" id="wind_image">
        <p>${windSpeed}${weatherData.current_units.wind_speed_10m}</p>
        <p>wind speed</p>
        </div>
        </div>
        </div> 
        `;
  }
  getWeather();
}
