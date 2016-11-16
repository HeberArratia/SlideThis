// Buena practica
'use strict';

//Importamos express
var express = require('express'),
	// Importamos modelo
	// "./" porque esta en el mismo lugar
	Project = require('./models').Project, 
	Column = require('./models').Column, 
	//Importamos enrutador
	router = express.Router();

//Obtener todos los proyectos <- Ok
router.route('/allprojects')
	.get(function(req,res){
		Project.find(function(err, result) {
		    if(err){
		    	console.log('error al buscar en /projects');
		    	res.send(500, err.message);
		    } else {
		    	console.log('se responden todos los proyectos en /projects');
		     	res.status(200).jsonp(result);
		    }
    	});	
	})

//Obtener todos los proyectos según usuario específico  <- Ok
router.route('/projectsbyuser')
	.post(function(req,res){
		console.log("es: " + req.body.iduser);
		Project.find({iduser : req.body.iduser}, function(err, result) {
		    if(err){
		    	res.send(500, err.message);
		    } else {
		     	res.status(200).jsonp(result);
		    }
    	});	
	})

//Obtener un proyecto según su id <- Ok
router.route('/projectbyid/')
	.post(function(req, res){	
		Project.findById(req.body.idpro, function(err, result) {
			if(err){
				res.send(500, err.message);
			} else {
				res.status(200).jsonp(result);
			}
		});		
	});

//Crear proyecto <-Ok
router.route('/newproject/')
	.post(function(req, res){	
		var project = new Project({
			name   : req.body.name,
			iduser  : req.body.iduser
		});
		//Siempre debemos guardar
		// para que quede en la db
		project.save(function(err, result){
			if (err){
				console.log(err);
				console.log("hay un error al guardar nuevo proyecto");
				res.status(500).send(err.message);
			} else {
				res.status(200)
            	.jsonp(result);
		    	console.log("se ha guardado un nuevo proyecto");
			}
		});
	});

//Eliminar proyecto <-Ok
router.route('/deleteproject/')
	.post(function(req, res){	
		Project.findById(req.body.idpro, function(err, pro) {
	        pro.remove(function(err) {
	            if (err){
					console.log(err);
					console.log("no se pudo eliminar proyecto");
					res.status(500).send(err.message);
				} else {
					console.log("proyecto eliminado");
				}
	        });
	    });
	});

// Ver columnas según id proyecto <- Ok
router.route('/columnsbyproject')
	.post(function(req,res){
		Column.find({idpro : req.body.idpro}, function(err, result) {
		    if(err){
		    	res.send(500, err.message);
		    } else {
		     	res.status(200).jsonp(result);
		    }
    	});	
	})

// Actualizar modulos de proyecto según id proyecto <- Ok
router.route('/updatecolumns')
	.post(function(req,res){
		console.log(req.body[0].idpro);
		Column.remove({idpro : req.body[0].idpro}, function(err, result) {
		    if(err){
		    	res.send(500, err.message);
		    } else {
		     	console.log("todas las columnas con ese id de pro removidas");
		     	Column.collection.insert(req.body, function(err, result){
		     		if(err){
				    	res.send(500, err.message);
				    } else {
				    	console.log("las columnas se han actualizado");
				     	res.status(200).jsonp(result);
				    }
		     	});
		    }
    	});	
	})

//Crear columna <- Ok
router.route('/newcolumn/')
	.post(function(req, res){	
		var column = new Column({
			type     : req.body.type,
			template : req.body.template,
			t1       : req.body.t1,
			t2       : req.body.t2,
			url      : req.body.url,
			idpro    : req.body.idpro
		});
		//Siempre debemos guardar
		// para que quede en la db
		column.save(function(err, result){
			if (err){
				console.log(err);
				console.log("hay un error al guardar nueva columna");
				res.status(500).send(err.message);
			} else {
				res.status(200)
            	.jsonp(result);
		    	console.log("se ha guardado una nueva columna");
			}
		});
	});

//obtener todas las columnas <- Ok
router.route('/columns')
	.get(function(req,res){
		Column.find(function(err, result) {
		    if(err){
		    	console.log('error al buscar en /columns');
		    	res.send(500, err.message);
		    } else {
		    	console.log('se responden todas las columnas en /columns');
		     	res.status(200).jsonp(result);
		    }
    	});	
	})


module.exports = router;