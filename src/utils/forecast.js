const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=29ca35c9a4e4d943f52deba46e01f447&query=" + latitude + "," + longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'Weather is <strong>'  + body.current.weather_descriptions[0]   + "</strong>" 
            + "\r\nCurrent temp is <strong>" + body.current.temperature + "</strong> degrees out"  
            + "\r\nNow the time is: <strong>" + body.location.localtime + "</strong>"
            + "\r\nWind speed is: <strong>" + body.current.wind_speed + "</strong> km/h"
            + "\r\nWind direction: <strong>" + body.current.wind_dir + "</strong>"
            + "\r\nHumidity: <strong>" + body.current.humidity + "</strong>"
            + "\r\nFeels like: <strong>" + body.current.feelslike + "</strong> degrees"
            );
        }
    });
}

module.exports = forecast;