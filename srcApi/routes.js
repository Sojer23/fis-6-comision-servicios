'use strict';

var passport = require('passport');
var express = require('express');
var comisionesController = require('./controllers/comisionesController.js'); // Comisiones API controller
var loginController = require('./controllers/loginController.js'); // Login API controller
var routes = express.Router();

//ROUTES
const BASE_API_PATH_COMISIONES = '/v1/comisiones';

// LOGIN MANAGEMENT
routes.route(BASE_API_PATH_COMISIONES+'/login').post(loginController.postUser);

//COMISIONES MANAGEMENT
routes.route(BASE_API_PATH_COMISIONES).get(passport.authenticate('localapikey',{session:false}),comisionesController.getComisiones);
routes.route(BASE_API_PATH_COMISIONES+'/:_id').get(passport.authenticate('localapikey',{session:false}),comisionesController.getComision);
routes.route(BASE_API_PATH_COMISIONES+'/i/:investigadorID').get(passport.authenticate('localapikey',{session:false}),comisionesController.getComisionesByInvestigador);
routes.route(BASE_API_PATH_COMISIONES+'/p/:proyectoID').get(passport.authenticate('localapikey',{session:false}),comisionesController.getComisionesByProject);
routes.route(BASE_API_PATH_COMISIONES).post(passport.authenticate('localapikey',{session:false}),comisionesController.postComision);
routes.route(BASE_API_PATH_COMISIONES+'/load').post(passport.authenticate('localapikey',{session:false}),comisionesController.loadComisiones);
routes.route(BASE_API_PATH_COMISIONES).put(passport.authenticate('localapikey',{session:false}),comisionesController.putComision);
routes.route(BASE_API_PATH_COMISIONES).delete(passport.authenticate('localapikey',{session:false}),comisionesController.deleteAllComisiones);
routes.route(BASE_API_PATH_COMISIONES+'/:_id').delete(passport.authenticate('localapikey',{session:false}),comisionesController.deleteComisionById);

module.exports = routes;