'use strict';

var express = require('express');
var comisionesController = require('./controllers/comisionesController.js'); // Comisiones API controller
var routes = express.Router();

//ROUTES
//USERS MANAGEMENT
routes.route('/v1/comisiones').get(comisionesController.getComisiones);
routes.route('/v1/comisiones/:_id').get(comisionesController.getComision);
routes.route('/v1/comisiones/i/:investigadorID').get(comisionesController.getComisionesByInvestigador);
routes.route('/v1/comisiones/p/:proyectoID').get(comisionesController.getComisionesByProject);
routes.route('/v1/comisiones').post(comisionesController.postComision);
routes.route('/v1/comisiones/load').post(comisionesController.loadComisiones);
routes.route('/v1/comisiones').put(comisionesController.putComision);
routes.route('/v1/comisiones').delete(comisionesController.deleteAllComisiones);
routes.route('/v1/comisiones/:_id').delete(comisionesController.deleteComisionById);

module.exports = routes;