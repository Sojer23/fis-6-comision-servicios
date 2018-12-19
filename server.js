var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var Comision = require('./comisiones');
var ApiKey = require('./apikeys');

var passport = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;

const COMISIONES_APP_DIR = "/dist/comisiones-app";
var BASE_API_PATH = "/api/v1";

const ESTADOS = ["SOLICITADA", "ACEPTADA", "RECHAZADA", "SUBSANACION"]



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

app.use(express.static(path.join(__dirname, COMISIONES_APP_DIR)));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, COMISIONES_APP_DIR, '/index.html'));
});

// Funciones auxiliares

function checkComision(comision){
  if(!comision._id || !comision.investigadorID || !comision.destino || !comision.fechaInicio || !comision.fechaFin || !comision.sustitutoID || !comision.razon || !comision.coste || !comision.proyectoID || !comision.estado){
    return false
  }
  if(ESTADOS.includes(comision.estado)){
    return false
  }
  return true
}

// GET

// Para el administrador puede solicitar todo, después se filtra en el front end por ESTADO
app.get(BASE_API_PATH + "/comisiones",
        passport.authenticate('localapikey', {session:false}),
        (req, res) => {
            Comision.find((err, comisiones) => {
                if (err) {
                    console.error("Error accessing database");
                    res.sendStatus(500);
                } else {
                    res.send(comisiones.map((comision) => {
                        return comision.cleanup();
                    }));
                }
            });
        }
);


// Para los investigadores le damos sus comisiones
app.get(BASE_API_PATH + "/comisiones/:investigadorID", (req, res) => {
    // Get a single comision
    var investigadorID = req.params.investigadorID;
    console.log(Date()+" - GET /comisiones/"+investigadorID);

    Comision.find({"investigadorID": investigadorID},(err,comisiones)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            res.send(comisiones.map((comision)=>{
                return comision;
            }));
        }
    });
});

// Comisiones de cada proyecto
app.get(BASE_API_PATH + "/comisiones/:proyectoID", (req, res) => {
    // Get a single comision
    var proyectoID = req.params.proyectoID;
    console.log(Date()+" - GET /comisiones/"+proyectoID);

    Comision.find({"proyectoID": proyectoID},(err,comisiones)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            res.send(comisiones.map((comision)=>{
                return comision;
            }));
        }
    });
});

// POST

// Post basico
app.post(BASE_API_PATH + "/comisiones", (req, res) => {
    // Create a new comision
    if (!req.body){
      res.sendStatus(400);
      return;
    }
    console.log(Date()+" - POST /comisiones");
    var comision = req.body;
    comision.estado = "SOLICITADA";
    if(!checkComision(comision)){
      res.sendStatus(422);
      return;
    }
    Comision.create(comision, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

// PUT

// Put para que el administrador cambie el estado
app.put(BASE_API_PATH + "/comisiones", (req, res) => {
    // Update comision
    var updatedComision = req.body;
    console.log(Date()+" - PUT /comisiones/"+updatedComision._id);

    if(!updatedComision){
        res.sendStatus(400);
        return;
    }
    if(!checkComision(updatedComision)){
        res.sendStatus(422);
        return;
    }

    Comision.update({"_id": updatedComision._id},updatedComision,(err,numUpdated)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numUpdated>1){
                console.warn("Incosistent DB: duplicated id");
            }else if(numUpdated == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

// DELETE

app.delete(BASE_API_PATH + "/comisiones", (req, res) => {
    // Remove all comisiones
    console.log(Date()+" - DELETE /comisiones");
    Comision.remove({});
    res.sendStatus(200);
});


app.delete(BASE_API_PATH + "/comisiones/:id", (req, res) => {
    // Delete a single comision
    var _id = req.params._id;
    console.log(Date()+" - DELETE /comisiones/"+_id);

    Comision.remove({"id": _id},{},(err,numRemoved)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numRemoved>1){
                console.warn("Incosistent DB: duplicated id");
            }else if(numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});


module.exports.app = app;
