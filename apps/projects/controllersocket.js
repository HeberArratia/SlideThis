// Buena practica
'use strict';

//Importamos express
var express = require('express'),
	// Importamos modelo
	// "./" porque esta en el mismo lugar
	Project = require('./models').Project, 
	Column = require('./models').Column;

module.exports = function(io, iduser){	

	io.on('connection', function(socket) {
	console.log("var es : " +  iduser);
		Project.find({iduser : iduser}, function(err, result) {
		    if(err){
		    	console.log("error en buscar proyectos por iduser");
		    } else {
		     	io.sockets.emit('loadprojects', result);
		    }
    	});	
		

		//Buscar trayecto
		socket.on('loadprojectssd', function(dataBuscar) {
    		
    		 
 		});

		

	});
};