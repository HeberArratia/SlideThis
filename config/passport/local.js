//configuracion para logeo con
// username y password
// si necesitamos para fb creamos otro
// archivo de estos con esa estrategia

// Buena practica
'use strict';

//Le decimos al servidor que
// vamos a usar passport para
// la autentificación
// Es decir, configurar el servidor
// para que acepte a passport
// como medio de autentificación
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	//requerimos el modelo para verificar las credenciales
	User = require('../../apps/user/models').User;


// configuramos nuestra estrategia
var local = function(server){
		// hacemos que passport utilice nuestra estrategia
		passport.use(new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password'
		},
		function(username, password, done){
			User.findOne({
				username : username,
			}).exec()
			// esto es una promesa
			.then(function(user){
				// si viene un usuario
				if (!user){
					// mandamos un mensaje de error gracias a coonectflash
					return done(null, false, {'message' : 'user: ' + 
					username + ' not found'});
				} else {
					//si viene el usuario
					// si coinciden los pass
					if (user.password === password){
						return done(null, user)
					};
				}
			})
			//console.log(username);
			//console.log(password);
		}
	));
	//ruta para que las personas se puedan logear
	server.post('/login/', passport.authenticate('local',{
		//algunas caracterisitcas de la
		// autentificacion

		//en caso de resultado satisfactorio se va a dashboard
		successRedirect : '/projects',
		// en caso de que falle se va a raiz (login)
		failureRedirect: '/',
		// para utilizar mensaje de error
		failureFlash : true,
	}))
};

module.exports = local;