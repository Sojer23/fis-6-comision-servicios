'use strict';

var express = require('express');

//MODELS
var ApiKey = require('../models/apikeys.js');

//// EXPORT FUNCTIONS /////
module.exports = {
    postUser: _postUser
};

// Funciones auxiliares
function checkUser(user){
    if(user.user && user.password){
        console.log(Date()+" -Cuerpo de usuario bien definido, comprobando existencia...");
        return true;
    }else{
        console.log(Date()+" -El cuerpo del usuario no está bien definido.");
        return false;
    }    
  }


// POST
// Crear un nuevo usuario en la API, le generara y devolvera una api key. Si ya existe retorna su API key.
function _postUser(req,res){
    try{
        console.log(Date()+" - POST /user");
        var newUser = req.body;

        if(!newUser){
            console.log(Date()+"- ERROR. Falta el documento para la inserción en la base de datos.");
            res.sendStatus(400); //Bad Request
        }
        else{
            if(!checkUser(newUser)){
                console.log(Date()+"- ERROR. Alguno de los campos del usuario es erroneo o está vacío.");
                res.sendStatus(422); //Unprocessable Entity
            }
            else{
            // Ver si el usuario existe
            ApiKey.findOne({user:newUser.user},
                (err,user)=>{
                    if (err) {console.error(Date()+"Error accesing DB");res.sendStatus(500);}
                    // Existe, devolver apikey
                    if (user) {
                        console.log(Date()+'- User already exists. Sending API key...')
                        res.status(200); 
                        res.json({apikey:user.apikey});
                    }
                    // No existe, crear un nuevo usuario y devolver su nueva apikey
                    else{
                        ApiKey.create(newUser,(err,user) => {
                            if (err) { 
                                console.error(Date()+"Error accesing DB");
                                res.sendStatus(500);
                            }else {
                                console.log(Date()+"- CREATED. Se ha insertado un nuevo usuario en la BD.");
                                // Devolver API key
                                res.status(201);
                                res.json({apikey:user.apikey});
                                }
                            });
                    }
                });
                }
            }
    }catch(err){
        console.log(Date()+" -Error posting a user object (_postUser)"+err);
    }
}