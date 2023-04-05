const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.listen(process.env.PORT || 2000, () => {});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/input.html");
});
app.post("/", (req, res) => {
  var cityName = req.body.cityName;
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=24717ca57714bfe19073e54a23e8c0de&units=metric",
    (response) => {
      var responseData = "";
      response.on("data", function (data) {
        responseData += data;
      });
      response.on("end", function () {
        const jsonData = JSON.parse(responseData);
        res.render("weather", { temperature: jsonData.main.temp });
      });
    }
  );
});
