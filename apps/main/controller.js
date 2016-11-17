// Buena practica
'use strict';

//Importamos express
var express = require('express'),
	//Importamos enrutador
	router = express.Router(),
	// permite saber si hay usuario logeado
	isLoggedIn = require('../user/middlewares').isLoggedIn,
	Project = require('../projects/models').Project;

router.route('/projects')
	.get(isLoggedIn, function(req,res){
		var context = {
			n_user : req.user.username,
			id_user : req.user._id
		}
		res.render('projects', context);
	});

/*router.route('/dashboard')
	.get(isLoggedIn, function(req,res){
		res.render('dashboard');
	});*/

router.route('/dashboard/:idpro')
	.get(isLoggedIn, function(req,res){
		Project.findById(req.params.idpro, function(err, result) {
			if(err){
				console.log("error al encontrar el proyecto");
			} else {
				if (result.iduser == req.user._id){
					var context = {
						id_pro : req.params.idpro,
						n_user : req.user.username,
						n_pro  : result.name
					}
					res.render('dashboard', context);
				} else {
					console.log("el usuario no es dueño de este proyecto");
					res.redirect('/projects/');
				}		
			}
		});		
	});

//Esto nos permite utilizar el archivo controller.js en 'otro' lugar
//El router lo usamos en otro lugar
module.exports = router;