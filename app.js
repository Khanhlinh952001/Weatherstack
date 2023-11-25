const asyncRequest = require('async-request');


const getWeather = async (location) => {
    const api_key = "dcd238d98fe9a220e33649e6ccf6e82b&query"
    const url = `http://api.weatherstack.com/current?access_key=${api_key}=${location}`;
    try {
        const res = await asyncRequest(url);
        const data = JSON.parse(res.body);
        const weather = {
            isSuccess: true,
            region: data.location.region,
            country: data.location.country,
            temperature: data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover: data.current.cloudcover,

        }
        console.log(weather);
        return weather;
    } catch (error) {
        console.log("error");
        return {
            isSuccess: false,
            error
        }
    }


}


const express = require("express");
const app = express();
const path = require("path");
const exphbs = require('express-handlebars');
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
    })
);
app.set('view engine', 'hbs');

app.get("/", async (req, res) => {
    const params = req.query;
    console.log(params);
    const location = params.address;
   const weather =  await getWeather(location);
    res.render("weather",{
        region : weather.region,
        country : weather.country,
        temperature : weather.temperature,
        wind_speed : weather.wind_speed,
        precip : weather.precip,
        cloudcover : weather.cloudcover

    });
})


const pathPublic = path.join(__dirname, "public");
app.use(express.static(pathPublic));

const port = process.env.PORT || 3000 ;
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
// Lắng nghe cổng được chọn hoặc cổng 3000 nếu không có cổng nào được cung cấp

