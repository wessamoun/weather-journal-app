/* Global Variables */
const apiKey = "d583d787346eed6c128cfa147f61e40f";
const generate = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

generate.addEventListener("click", async function () {
  const zCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeatherFunction(zCode)
    .then(function (temperature) {
      pDataFunction(temperature, feelings);
    })
    .then(function () {
      gDataFunction();
    })
    .catch(function () {
      console.log("Error");
    });
});

async function getWeatherFunction(zCode) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zCode}&appid=${apiKey}`;
  const getWeather = await fetch(apiURL);
  let jsonWeather = await getWeather.json();
  console.log(jsonWeather.main.temp);
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
    body: JSON.stringify({
      date: newDate,
      temperature: temperature,
      feelings: feelings,
    }),
  });
}
async function gDataFunction() {
  const gData = await fetch("/get");
  const jData = await gData.json();
  console.log(jData);
}
