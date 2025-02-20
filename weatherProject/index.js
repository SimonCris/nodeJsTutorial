require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const {getWeather} = require("./functions");
const {getData} = require("country-list");
const {getAccessToken} = require("./entraIDIntegration");

const app = express();
app.use(express.static('public'));
app.listen(3000);

// Usa il middleware cookie-parser
app.use(cookieParser());

/** MAPPING DELLE ROTTE DEL SERVER */
app.get('/', (req, res) => {
    res.send('Hello, World!!!!');
})

app.get('/getWeather/:zip([0-9]+)', async (req, res) => {
    try {
        const country = req.query.country_code || 'IT';
        const lang = req.query.lang || 'it';
        const result = await getWeather({lang, zip: req.params.zip + ',' + country});
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.get('/getWeather/:city([a-zA-Z]+)', async(req, res) => {
    try{
        const lang = req.query.lang || 'it';
        const weather =  await getWeather({lang, q : req.params.city });
        res.json(weather);
        return weather;
    } catch (e) {
        res.status(500).send(e.message)
    }
});

app.get('/getCountries', async(req, res) => {
    try{
        res.json(getData());
    } catch (e) {
        res.status(500).send(e.message)
    }
});

app.get('/getAccessToken', async(req, res) => {

    try {
        const accessToken = await getAccessToken();

        res.cookie('entraID', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000
        });

        res.status(200).json({
            message: 'Token recuperato con successo',
            data: accessToken
        });
    } catch(error) {
        console.error('Errore:', error);
        res.status(500).json({
            message: 'Errore durante il recupero del token',
            error: error.message
        });
    }

})



