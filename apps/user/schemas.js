// Buena practica
'use strict';

var mongoose = require('../../config/mongoose'),
//Objeto que nos va a permitir crear schemas
	Schema = mongoose.Schema;

//Vamos a crear nuestro schema
// esto es como crear una tabla en mysql

var schemas = {
	userSchema : new Schema({
		username : {
			type : String, 
			required: [true, 'username is required']
		},
		password : {
			type : String,
			required: [true, 'password is required']
		}
	})
};

//La variable schemas la vamos a importar

module.exports  = schemas;