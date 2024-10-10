const express = require('express');
const {getWeather} = require("./functions");
const {getData} = require("country-list");

const app = express();
app.listen(3000);
app.use(express.static('public'));

/** MAPPING DELLE ROTTE DEL SERVER */
app.get('/', (req, res) => {
    res.send('Hello, World!!!!');
})

app.get('/getWeather/:zip([0-9]+)', async (req, res) => {
    try {
        const result = await getWeather({zip: req.params.zip + ',IT'});
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.get('/getWeather/:city([a-zA-Z]+)', async(req, res) => {
    try{
        const lang = req.query.lang || 'it';
        const weather =  await getWeather({q : req.params.city });
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



