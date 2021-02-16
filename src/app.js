const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'EEU Software'
    })
})

/* ============ PAGES ============== */
app.get('/about', (req, res) => {
    res.render('about', {
        helpText: 'We can make apps.',
        title: 'About Us',
        name: 'EEU Software'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Send us an email.',
        title: 'Help',
        name: 'EEU Software'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, location } = {}) => {
        
        if (error) {
            return res.send({ error });
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData, location, address: req.query.address});
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"})
    }
    console.log(req.query.search);
    res.send({products: []});
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'EEU Software',
        errorMessage: 'Help article not found'
    });
});

// 404 Error page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'EEU Software',
        errorMessage: 'Page not found'
    });
});

/* ======= START UP SERVER ==================== */
app.listen(3000, () => {
    console.log("Server started successfully on port 3000.");
});
// app.listen(process.env.PORT || 3000,  () => {     console.log("Server started
// successfully on port 3000."); });