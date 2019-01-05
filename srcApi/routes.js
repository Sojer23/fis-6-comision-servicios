'use strict';

var passport = require('passport');
var express = require('express');
var comisionesController = require('./controllers/comisionesController.js'); // Comisiones API controller
var routes = express.Router();

//ROUTES
const BASE_API_PATH = '/v1/comisiones';

//USERS MANAGEMENT
routes.route(BASE_API_PATH).get(comisionesController.getComisiones,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH+'/:_id').get(comisionesController.getComision,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH+'/i/:investigadorID').get(comisionesController.getComisionesByInvestigador,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH+'/p/:proyectoID').get(comisionesController.getComisionesByProject,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH).post(comisionesController.postComision,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH+'/load').post(comisionesController.loadComisiones,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH).put(comisionesController.putComision,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH).delete(comisionesController.deleteAllComisiones,passport.authenticate('localapikey',{session:false}));
routes.route(BASE_API_PATH+'/:_id').delete(comisionesController.deleteComisionById,passport.authenticate('localapikey',{session:false}));

module.exports = routes;