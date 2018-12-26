'use strict';

var express = require('express');
var comisionesController = require('./controllers/comisionesController.js'); // Comisiones API controller
var routes = express.Router();

//ROUTES
//USERS MANAGEMENT
routes.route('/v1/comisiones').get(comisionesController.getComisiones);
routes.route('/v1/comisiones/:investigadorID').get(comisionesController.getComisionesByID);
routes.route('/v1/comisiones/:proyectoID').get(comisionesController.getComisionesByProject);
routes.route('/v1/comisiones').post(comisionesController.postComision);
routes.route('/v1/comisiones').put(comisionesController.putComision);
routes.route('/v1/comisiones').delete(comisionesController.deleteComision);
routes.route('/v1/comisiones/:id').delete(comisionesController.deleteComisionById);

module.exports = routes;