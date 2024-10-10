const APPID = '2d6337e5725b3a6c7fe0c655b54fe51e';

const WEATHERURL = 'https://api.openweathermap.org/data/2.5/weather?lang=it&appid='+ APPID + '&units=metric&q=';
WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather?lang=it&appid=' + APPID + '&units=metric';


const STATUS_CODE = require('http').STATUS_CODES;

module.exports = {
    WEATHER_API,
    WEATHERURL,
    STATUS_CODE
};
