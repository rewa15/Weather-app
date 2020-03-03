const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res)
{
    const query= req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=e39afe25924cf12b1bb9fc2360b7d140&units=metric";
    https.get(url, function(response)
    {
       console.log(response.statusCode);
       
       response.on("data", function(data)
    {
       const weatherdata = JSON.parse(data);

       const weatherdesc = weatherdata.weather[0].description;
       const icon = weatherdata.weather[0].icon;
       const url = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
       console.log(weatherdesc);
       
       res.write("<p> Weather: " + weatherdesc+ "</p>");
       res.write("<h1>The temperature of " + query + " is " + weatherdata.main.temp +" degree celcius</h1>");
       res.write("<img src="+ url+ ">");
       res.send();
  })
    })
 
})

app.listen(3000);