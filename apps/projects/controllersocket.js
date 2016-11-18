// Buena practica
'use strict';

//Importamos express
var express = require('express'),
	// Importamos modelo
	// "./" porque esta en el mismo lugar
	Project = require('./models').Project, 
	Column = require('./models').Column;

module.exports = function(io){	

	io.on('connection', function(socket) {
	
		//mostrar todos los proyectos según usuario
		socket.on('projectsbyuser', function(data) {
	    	Project.find({iduser : data})
				//Más recientes primero
				.sort({moment: -1})
				.exec(function(err, result) {
				    if(err){
			    		console.log("error en buscar proyectos por iduser");
			    	} else {
			     		socket.emit('loadprojects', result);
			    	}
    		});	
		});

		//eliminar un proyuecto
		socket.on('deleteproject', function(data) {
	    	Project.findById(data.idpro, function(err, pro) {
	        	pro.remove(function(err) {
		            if (err){
						console.log("hay un error al elimanr proyecto");
					} else {
						Project.find({iduser : data.iduser})
							//Más recientes primero
							.sort({moment: -1})
							.exec(function(err, result) {
							    if(err){
						    		console.log("error en buscar proyectos por iduser");
						    	} else {
						     		socket.emit('loadprojects', result);
						    	}
			    		});	
						console.log("proyecto eliminado");
					}
	        	});
	    	});	
		});

		// obtener un proyecto por su id
		socket.on('columnsbyproject', function(data) {
			Column.find({idpro : data}, function(err, result) {
			    if(err){
			    	console.log("error al buscar columnas por id de proyecto");
			    } else {
			     	socket.emit('loadcolumns', result);
			    }
	    	});		
		});

		//crear nuevo prouecto
		socket.on('newproject', function(projectData) {
    		var project = new Project({
				name   : projectData.name,
				iduser  : projectData.iduser
			});
			project.save(function(err, result){
				if (err){
					console.log("hay un error al guardar nuevo proyecto");
				} else {
			    	console.log("se ha guardado un nuevo proyecto");
			    	Project.find({iduser : projectData.iduser})
						//Más recientes primero
						.sort({moment: -1})
						.exec(function(err, result) {
						    if(err){
					    	console.log("error en buscar proyectos por iduser");
					    		} else {
					     		socket.emit('loadprojects', result);
					    	}
		    		});	
				}
			});	 
 		});

		socket.on('updatecolumns', function(columns) {
			Column.remove({idpro : columns[0].idpro}, function(err, result) {
			    if(err){
			    	console.log("error al eliminar en actualizar las columnas");
			    } else {
			     	console.log("todas las columnas con ese id de pro removidas");
			     	Column.collection.insert(columns, function(err, result){
			     		if(err){
					    	console.log("error al guardar las nuevas columnas actualizadas " + err);
					    } else {
					    	console.log("las columnas se han actualizado");
					    	io.sockets.emit('loadcolumnsinview' + columns[0].idpro + '', columns);
					    }
			     	});
			    }
	    	});	
		});

	});
};