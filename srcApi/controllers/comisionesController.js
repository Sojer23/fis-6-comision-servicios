'use strict';

var express = require('express');
var fs = require('fs');
var router = express.Router();

//APIKEYS
var ApiKey = require('../models/apikeys');

//MODELS
var Comision = require('../models/comisiones.js');
var ComisionDB = Comision.Comision;


//ESTADOS
const ESTADOS = ["SOLICITADA", "ACEPTADA", "RECHAZADA", "SUBSANACION"]

//// EXPORT FUNCTIONS /////
module.exports = {
    getComision: _getComision,
    getComisiones: _getComisiones,
    getComisionesByInvestigador: _getComisionesByInvestigador,
    getComisionesByProject: _getComisionesByProject,
    postComision: _postComision,
    putComision: _putComision,
    deleteAllComisiones: _deleteAllComisiones,
    deleteComisionById: _deleteComisionById,
    loadComisiones: _loadComisiones
};


// Funciones auxiliares

function checkComision(comision){
    if(comision.investigadorID && 
        comision.destino && 
        comision.fechaInicio && 
        comision.fechaFin && 
        comision.sustitutoID && 
        comision.razon &&
        comision.coste && 
        comision.proyectoID &&
        comision.estado){
            console.log("El cuerpo de la comisión está bien definido. Comprobando estado...");
            //Para comprobar que una comisión no trae un estado que no está entre los válidos
            if(!ESTADOS.includes(comision.estado)){
                console.log("Estado no válido.")
                return false
            }else{
                console.log("Estado válido. Comisión correcta.")
                return true
            }
    }else{
        return false
    }    
  }
  
// GET

// Get comision unica por su ID
function _getComision(req,res){
    try{
        console.log(Date()+" - GET api/v1/comisiones/_id");
        var _id = req.params._id;

        if(!_id){
            console.log(Date()+"- ERROR. Es necesario incluir el parametro '_id' en esta petición.");
            res.sendStatus(400); //Bad Request
        }else{
            console.log(Date()+" - GET api/v1/comisiones/"+_id);

            ComisionDB.find({"_id": _id}, (err, comisiones) => {
                if (err) {
                    console.error("Error accessing database");
                    res.sendStatus(500);
                } else {
                    console.log("Se ha pedido una comisión");
                    res.send(comisiones);
                }
            });
        }
    }catch(err){
        console.log("Error getting comision by _id (_getComision):"+err);
    }
}


// Para el administrador puede solicitar todo, después se filtra en el front end por ESTADO

function _getComisiones(req,res){
        try{

        console.log(Date()+" - GET api/v1/comisiones/");

        ComisionDB.find((err, comisiones) => {
            if (err) {
                console.error("Error accessing database");
                res.sendStatus(500);
            } else {
                console.log("Se han pedido comisiones");
                res.send(comisiones.map((comision) => {
                    return comision;
                }));
            }
        });
        }catch(err){
            console.log("Error getting all comisiones (_getComisiones):"+err);
        }
}


// Para cada investigador le damos sus comisiones
function _getComisionesByInvestigador(req,res){
    try{
        console.log(Date()+" - GET /comisiones/investigadorID");
        var investigadorID = req.params.investigadorID;

        if(!investigadorID){
            console.log(Date()+"- ERROR. Es necesario incluir el parametro 'investigadorID' en esta petición.");
            res.sendStatus(400); //Bad Request
        }else{
            console.log(Date()+" - GET /comisiones/"+investigadorID);

            ComisionDB.find({"investigadorID": investigadorID},(err,comisiones)=>{
                if(err){
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                }else{
                    res.send(comisiones.map((comision)=>{
                        return comision;
                    }));
                }
            });
        }
    }catch(err){
        console.log("Error getting comisiones by investigadorID (_getComisionesByInvestigador):"+err);
    }
}

// Comisiones de cada proyecto
function _getComisionesByProject(req,res){
    try{
        // Get a single comision
        var proyectoID = req.params.proyectoID;
        console.log(Date()+" - GET /comisiones/proyectoID");

        if(!proyectoID){
            console.log(Date()+"- ERROR. Es necesario incluir el parametro 'proyectoID' en esta petición.");
            res.sendStatus(400); //Bad Request
        }else{
            console.log(Date()+" - GET /comisiones/"+proyectoID);
            ComisionDB.find({"proyectoID": proyectoID},(err,comisiones)=>{
                if(err){
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                }else{
                    res.send(comisiones.map((comision)=>{
                        return comision;
                    }));
                }
            });
        }
    }catch(err){
        console.log("Error getting comisiones by proyectoID (_getComisionesByProject):"+err);
    }
}



// POST
// Post basico
function _postComision(req,res){
    try{
        console.log(Date()+" - POST /comisiones");
        var newComision = req.body;
        if(!newComision){
            console.log(Date()+"- ERROR. Falta el documento para la inserción en la base de datos.");
            res.sendStatus(400); //Bad Request
        }else{
            //Se establece a solicitada cada comisión que se inserta
            newComision.estado = "SOLICITADA";
            if(!checkComision(newComision)){
                console.log(Date()+"- ERROR. Alguno de los campos de la comisión es erroneo o está vacío.");
                res.sendStatus(422); //Unprocessable Entity
            }
            else{
            ComisionDB.create(newComision, (err) => {
                if (err) {
                    console.error(Date()+"Error accesing DB");
                    res.sendStatus(500);
                } else {
                    console.log(Date()+"- CREATED. Se ha insertado una nueva comisión en la BD.");
                    res.sendStatus(201);
                }
            });
        }
        }
    }catch(err){
        console.log("Error posting a comisión object (_postComision)"+err);
    }
}

//LOAD a bunch of comisiones
function _loadComisiones(req,res){
    try{
        console.log(Date()+" - POST /comisiones/");
 
        var comisiones = JSON.parse(fs.readFileSync(__dirname+'/../data/comisiones.json', 'utf8'));

        ComisionDB.create(comisiones.comisiones, function (error, docs) {
            if (error){ 
                //Check duplicate email
                if (error.name = "BulkWriteError" && error.code === 11000) {
                    console.error("Error. Trying to insert duplicate comision on DB: "+error);
                    res.send({code: 409});
                }else{
                    console.error("Error inserting multiple comisiones on DB: "+error);
                    res.sendStatus(404);
                }
            } else {
                console.log("Multiple comisones inserted to DB");
                res.sendStatus(201);
            }
        });
        
        
    }catch (err){
        console.log("Error load initial comisiones (_loadComisiones): "+ err);
    }
}

// PUT
// Put para que el administrador cambie el estado
function _putComision(req,res){
    try{
        // Update comision
        var updatedComision = req.body;
        console.log(Date()+" - PUT /comisiones/"+updatedComision._id);

        if(!updatedComision){
            console.log("ERROR. PUT request without comision body");
            res.sendStatus(400);//Bad Request
        }else{
            //Comprobar que la comisión a actualizar es correcta
            if(!checkComision(updatedComision)){
                console.log("WARNING. The body of menu is uncomplete.");
                res.sendStatus(422); //Unprocessable entry
            }else{
                ComisionDB.update({"_id": updatedComision._id},updatedComision,(err,numUpdated)=>{
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
            }
        }
    }catch(err){
        console.log("Error uploading comision (_putComision): "+ err);
    }
}

// DELETE
function _deleteAllComisiones(req,res){
    try{
        //Remove all comisiones
        console.log(Date()+" - DELETE /comisiones DELETE ALL COMISIONES");
        ComisionDB.deleteMany({}, (err, numRemoved)=>{
            if(err){
                console.error("Error accesing DB");
                res.sendStatus(500);
            }else{
                if(numRemoved.n>1){
                    console.log("Se han eliminado "+numRemoved.n+" comisiones de la colección Comisiones.")
                    res.sendStatus(200);
                }else if(numRemoved.n == 0) {
                    res.sendStatus(404);
                    console.log("La colección 'Comisiones' está vacía, no hay nada que borrar.")
                }
            }
        });
    }catch(err){
        console.log("Error deleting all comisiones (_deleteAllComisiones): "+ err);
    }
}

function _deleteComisionById(req,res){
    try{
        console.log(Date()+" - DELETE api/v1/comisiones/_id");
        var _id = req.params._id;

        if(!_id){
            console.log(Date()+"- ERROR. Es necesario incluir el parametro '_id' en esta petición.");
            res.sendStatus(400); //Bad Request
        }else{
            console.log(Date()+" - DELETE api/v1/comisiones/"+_id);
            ComisionDB.remove({"_id": _id},(err,numRemoved)=>{
                if(err){
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                }else{
                    if(numRemoved>1){
                        console.warn("Incosistent DB: duplicated id");
                    }else if(numRemoved == 0) {
                        res.sendStatus(404);
                    } else {
                        console.log("Se ha eliminado la comisión con _id: "+_id);
                        res.sendStatus(200);
                    }
                }
            });
        }
    }catch(err){
        console.log("Error deleting a comision (_deleteComisionById): "+ err);
    }
}