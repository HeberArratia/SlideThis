// Buena practica
'use strict';
var mongoose = require('../../config/mongoose'),
//Traemos las schemas necesarias
	projectSchema = require('./schemas.js').projectSchema,
	columnSchema = require('./schemas.js').columnSchema;

//Creamos los modelos y los exportamos
var models = {
	Project : mongoose.model('project', projectSchema),
	Column : mongoose.model('column', columnSchema)
};

module.exports = models;