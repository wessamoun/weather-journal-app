/* Global Variables */
const apiKey = "d583d787346eed6c128cfa147f61e40f";
const generate = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// Adds an event listener to an existing HTML button from DOM
generate.addEventListener("click", async function () {
  // variables to get inputs values
  const zCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  // A function that uses fetch() to make a GET request to the OpenWeatherMap API.
  getWeatherFunction(zCode)
    .then(function (temperature) {
      // A function to hold the data to POST.
      pDataFunction(temperature, feelings);
    })
    .then(function () {
      // function to fetch the data from the app 
      gDataFunction();
    })
    .then(function () {
      // A function to update UI
      UIEditFunction();
    })
    .catch(function () {
      console.log("Error");
      // A function to work if there an error or the user did not insert the zip code
      errorFunction();
    });
});

async function getWeatherFunction(zCode) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zCode}&appid=${apiKey}`;
  const getWeather = await fetch(apiURL);
  // Transform into JSON
  let jsonWeather = await getWeather.json();
  console.log(jsonWeather.main.temp);
  // (.main.temp) to get the temperature info only
  let temperature = jsonWeather.main.temp;
  return temperature;
}
async function pDataFunction(temperature, feelings) {
  const pData = await fetch("/post", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    //the data in body must be like the content-type
    body: JSON.stringify({
      date: newDate,
      temperature: temperature,
      feelings: feelings,
    }),
  });
}
async function gDataFunction() {
  const gData = await fetch("/get");
  // Transform into JSON
  const jData = await gData.json();
  console.log(jData);
}
async function UIEditFunction() {
  const weatherInfo = await fetch("/get");
  // Transform into JSON
  const finalWeatherInfo = await weatherInfo.json();
  document.querySelector(".title").innerHTML = "";
  document.getElementById("date").innerHTML = `Date is ${finalWeatherInfo.date}`;
  document.getElementById("temp").innerHTML = `Temperature is ${finalWeatherInfo.temperature}`;
  document.getElementById("content").innerHTML = `I am feeling ${finalWeatherInfo.feelings}`;
}
async function errorFunction() {
  document.querySelector(".title").innerHTML = "Error, Please make sure you insert the Zip code or try another time";
  document.getElementById("date").innerHTML = "";
  document.getElementById("temp").innerHTML = "";
  document.getElementById("content").innerHTML = "";
}
