const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

//body parser
app.use(bodyParser.urlencoded({extended: true}));

//Bind a get request to root
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/",(req,res) => {
   
let query ="Jodhpur";
//Fetch cityname from post request
query = req.body.cityName;

const apiKey= "YOUR API KEY GOES HERE";
const units ="metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey + "&lang=en";


https.get(url,(response) =>{
    response.on("data", (data) => {


     const weatherData = JSON.parse(data);
     
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const iconURL = "http://openweathermap.org/img/wn/" +icon +"@2x.png";
     res.write("<p>The weather in " + query  + " currently is</p>");
     res.write("<h2>Temprature is " + temp + " degree celsius</h2>");
     res.write("<img src=" +iconURL+"></img>" );   
     res.send()
    })
  })

})


app.listen(3000,() =>{
    console.log("Server running at port 3000");
});