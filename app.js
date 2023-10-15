const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const https = require("https");
app.listen(process.env.PORT || 2000, () => { });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/input.html");
});
app.post("/", (req, res) => {
  var cityName = req.body.cityName;
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    `&appid=${process.env.appid}&units=metric`,
    (response) => {
      var responseData = "";
      response.on("data", function (data) {
        responseData += data;
      });
      response.on("end", function () {
        const jsonData = JSON.parse(responseData);
        const ResponseCity = jsonData.name;
        const currentTemp = jsonData.main.temp;
        const feelsLike = jsonData.main.feels_like;
        const maxTemp = jsonData.main.temp_max;
        const minTemp = jsonData.main.temp_min;
        const description = jsonData.weather[0].description;
        const icon = jsonData.weather[0].icon;
        const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(jsonData);
        res.render("weather", {
          ResponseCity: ResponseCity,
          currentTemp: currentTemp,
          feelsLike: feelsLike,
          maxTemp: maxTemp,
          minTemp: minTemp,
          description: description,
          iconUrl: iconUrl,
        });
      });
    }
  );
});
