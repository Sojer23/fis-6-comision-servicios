'use strict'

//Dependencias Módulos
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var passport = require('passport');


//Dependencias Documentos
const routes = require('./routes.js');


//Dependencias Modelos
var ApiKey = require('./models/apikeys');

var LocalAPIKey = require('passport-localapikey-update').Strategy;

//Unión de front-end y back-end
const COMISIONES_APP_DIR = "../dist/comisiones-app";
var BASE_API_PATH = "/api/v1";


passport.use(new LocalAPIKey(
    (apikey, done) => {
        ApiKey.findOne({apikey: apikey}, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Unknown apikey ' +apikey });
            } else {
                console.log("Logged as: " + user.user);
                return done(null, user);
            }
        });
    }
));

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

/**API ROUTES */
app.use('/api', routes);

/**ANGULAR APP DIRECTIONS */
app.use(express.static(path.join(__dirname, COMISIONES_APP_DIR)));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, COMISIONES_APP_DIR, '/index.html'));
});


module.exports.app = app;
