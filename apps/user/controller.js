/* API REST PARA USUARIO */
'use strict';

//Importamos express
var express = require('express'),
	// Importamos modelo
	// "./" porque esta en el mismo lugar
	User = require('./models').User,
	//Importamos enrutador
	router = express.Router();
	
// para finalizar sesión

router.route('/logout/')
	.get(function(req, res){
		// este metodo nos da passport
		// sirve para cerrar sesion
		req.logout();
		res.redirect('/');
	});

router.route('/')
	.get(function(req,res){
		//Necesitamos mostrar el mensaje de error
		// el cual viene con ayuda de connect flash
		// para eso creamos un contexto que va a enviar
		// los datos
		var context = {
			error_message : req.flash('error')[0]
		}
		if(req.user){
			res.redirect('/projects/');
		} else {
			res.render('login', context);
		}
	});

//ok
router.route('/createuser/')
	.post(function(req,res){
			console.log("******");
			console.log(req.body.username);
			console.log(req.body.password);
			console.log("******");
		//Llenamos la db con los datos
		// que vienen pos POST
		// RECORDAR hachear la clave
		// o "ocultar" con bcrypt-nodejs (por ahora no)
		var user = new User({
			username : req.body.username,
			password : req.body.password
		});
		//Guardamos en nuevo usuario
		user.save(function(err, result){
			if (err){
				console.log(err);
				console.log("hay un error al guardar usuario");
				res.status(500).send(err.message);
			} else {
				res.status(200)
            	.jsonp(result);
		    	console.log("se ha agregado el usuario");
			}
		});
	});

//Obtener un json con todos los usuarios registrados en la base de datos
//ok
router.route('/getusers')
	.get(function(req,res){
		User.find(function(err, result) {
		    if(err){
		    	res.send(500, err.message);
		    } else {
		     	res.status(200).jsonp(result);
		    }
    	});	
	})



//Esto nos permite utilizar el archivo controller.js en 'otro' lugar
//El router lo usamos en otro lugar
module.exports = router;