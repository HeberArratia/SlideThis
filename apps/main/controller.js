// Buena practica
'use strict';

//Importamos express
var express = require('express'),
	//Importamos enrutador
	router = express.Router(),
	// permite saber si hay usuario logeado
	isLoggedIn = require('../user/middlewares').isLoggedIn;

router.route('/projects')
	.get(isLoggedIn, function(req,res){
		var context = {
			n_user : req.user.username
		}
		res.render('projects', context);
	});

router.route('/dashboard')
	.get(isLoggedIn, function(req,res){
		res.render('dashboard');
	});

router.route('/dashboard/:idpro')
	.get(isLoggedIn, function(req,res){
		console.log("el id es: " + req.params.idpro);
		var context = {
			id_pro : req.params.idpro,
			n_user : req.user.username
		}
		res.render('dashboard', context);
	});

//Esto nos permite utilizar el archivo controller.js en 'otro' lugar
//El router lo usamos en otro lugar
module.exports = router;