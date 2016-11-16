// Buena practica
'use strict';
var mongoose = require('../../config/mongoose'),
//Traemos schema usuarios
//Esto se hace porque podemos tener varios schemas
// por eso agregamos ".userSchema"
// Esto es como decir shemas.userShema;
	userSchema = require('./schemas.js').userSchema;

//Creamos el modelo y la exportamos
//Crear modelo que se va a llamar "user"
// Se asigna nombre de modelo y schema
//Los modelos sirven para ejecutar funciones sobre la db
//la db se crea sola
var models = {
	User : mongoose.model('user', userSchema)
};

module.exports = models;