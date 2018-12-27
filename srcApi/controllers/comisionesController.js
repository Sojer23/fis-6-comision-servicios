'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
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
    getComisiones: _getComisiones,
    getComisionesByID: _getComisionesByID,
    getComisionesByProject: _getComisionesByProject,
    postComision: _postComision,
    putComision: _putComision,
    deleteComision: _deleteComision,
    deleteComisionById: _deleteComisionById
};


// Funciones auxiliares

function checkComision(comision){
    if(!comision.investigadorID || 
        !comision.destino || 
        !comision.fechaInicio || 
        !comision.fechaFin || 
        !comision.sustitutoID || 
        !comision.razon || 
        !comision.coste || 
        !comision.proyectoID || 
        !comision.estado){
            console.log("El cuerpo de la comisión no está bien definido. Falta algún campo.")
      return false
    }
    if(ESTADOS.includes(comision.estado)){
      return false
    }
    return true
  }
  
// GET

// Para el administrador puede solicitar todo, después se filtra en el front end por ESTADO

function _getComisiones(req,res){
        try{

        console.log(Date()+" - GET api/v1/comisiones/");

        ComisionDB.find((err, comisiones) => {
            if (err) {
                console.error("Error accessing database");
                res.sendStatus(500);
            } else {
                res.send(comisiones.map((comision) => {
                    console.log("Se han pedido comisiones");
                    return comision;
                }));
            }
        });
        }catch(err){

        }
}


// Para cada investigador le damos sus comisiones
function _getComisionesByID(req,res){
    try{

        // Get a single comision
        var investigadorID = req.params.investigadorID;
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
    }catch(err){

    }
}

// Comisiones de cada proyecto
function _getComisionesByProject(req,res){
    try{
        // Get a single comision
        var proyectoID = req.params.proyectoID;
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
    }catch(err){

    }
}



// POST
// Post basico
function _postComision(req,res){
    try{
        // Create a new comision
        if (!req.body){
            res.sendStatus(400);
            return;
        }
        console.log(Date()+" - POST /comisiones");
        var comision = req.body;
        comision.estado = "SOLICITADA";
        console.log(comision);
        /*if(!checkComision(comision)){
            res.sendStatus(422);
            return;
        }*/
        ComisionDB.create(comision, (err) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        });
    }catch(err){

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
            res.sendStatus(400);
            return;
        }
        /*if(!checkComision(updatedComision)){
            res.sendStatus(422);
            return;
        }*/

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
    }catch(err){

    }
}

// DELETE
function _deleteComision(req,res){
    try{
        //Remove all comisiones
        console.log(Date()+" - DELETE /comisiones");
        ComisionDB.remove({});
        res.sendStatus(200);
    }catch(err){

    }
}

function _deleteComisionById(req,res){
    try{
        // Delete a single comision
        var _id = req.params._id;
        console.log(Date()+" - DELETE /comisiones/"+_id);

        ComisionDB.remove({"_id": _id},{},(err,numRemoved)=>{
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
    }catch(err){

    }
}