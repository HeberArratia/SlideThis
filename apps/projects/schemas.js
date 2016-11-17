// Buena practica
'use strict';

var mongoose = require('../../config/mongoose'),
//Objeto que nos va a permitir crear schemas
	Schema = mongoose.Schema;

//Vamos a crear nuestro schema

var schemas = {
	projectSchema : new Schema({
		name    : 	{
	                    type: String, 
	                    required: [true, 'name is required']
	                },
	    moment:     { 
	                  type: Date, 
	                  default: Date.now 
	                },
	    iduser  :   {
	                    type: String, 
	                    required: [true, 'iduser is required']
	            	} 
	}),
	columnSchema : new Schema({
		type    : 	{
	                    type: String, 
	                    required: [true, 'type is required'],
	                    enum:  {
		                          values : ['text', 'image', 'video'],
		                          message: 'enter a valid option'
		                        }
	            	},
	    template:   {
	                    type: Number
	            	}, 
	    t1      :   {
	                    type: String
	            	}, 
	    t2      :   {
	                    type: String
	            	}, 
	    url     :   {
	                    type: String
	            	}, 
	    idpro   :   {
	                    type: String,
	                    required: [true, 'idpro is required']
	            	}   	
	})
};

//La variable schemas la vamos a importar

module.exports  = schemas;