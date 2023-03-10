//Global Variables
let currentDate = document.querySelector("#today");
let city = document.querySelector("#city");
let cityInput = document.querySelector("#cityInput");
let temp = document.querySelector("#todayTemp");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let apiKey = "1b7bf581cf8af8c6c19fd4e49df2fbe3";

//Show Date and Time
let hour = new Date().getHours().toString().padStart(2, "0");
let minutes = new Date().getMinutes().toString().padStart(2, "0");
let dayIndex = new Date().getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dayIndex];
currentDate.innerHTML = `📅 ${day} ${hour}:${minutes}`;

//Change city
function showWeather(response) {
  let newTemp = Math.round(response.data.main.temp);
  let newDescription = response.data.weather[0].description;
  let newHumidity = response.data.main.humidity;
  let newWind = response.data.wind.speed;

  city.innerHTML = response.data.name;
  temp.innerHTML = newTemp;
  description.innerHTML = newDescription;
  humidity.innerHTML = newHumidity;
  wind.innerHTML = newWind;
}

function changeCity(event) {
  event.preventDefault();
  if (cityInput.value.trim()) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(showWeather);
  } else {
    alert("Please enter your city!");
  }
}
let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", changeCity);

//Show Temp. of current location
function showLocationTemp() {
  function getPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "1b7bf581cf8af8c6c19fd4e49df2fbe3";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showLocationTemp);
