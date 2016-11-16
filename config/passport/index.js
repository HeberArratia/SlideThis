// Buena practica
'use strict';

//Le decimos al servidor que
// vamos a usar passport para
// la autentificación
// Es decir, configurar el servidor
// para que acepte a passport
// como medio de autentificación
var passport = require('passport');

var passportConfig = function(server){
	//Vamos a utilizarlos...
	server.use(passport.initialize());
	server.use(passport.session());

	//Esto lo va a mandar a una variable que se llame
	// req.user y vamos a tener todos los datos
	// de quien se esta logeando
	passport.serializeUser(function(user, done){
		done(null, user);
	});
	passport.deserializeUser(function(user, done){
		done(null, user);
	});
	//requerimos la estrategia local
	require('./local')(server);
};

module.exports = passportConfig;