// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
let port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server is running in port 8000");
}

app.get("/get", function (req, res) {
  res.send(projectData);
});

app.post("/post", function (req, res) {
  projectData.temperature = req.body.temperature;
  projectData.feelings = req.body.feelings;
  projectData.date = req.body.date;
  res.send();
});
