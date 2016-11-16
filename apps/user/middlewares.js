// vamos a usar este archivo para
// crear un middelware que solo de acceso
// a urls especificas donde 
// el usuario este logeado
// Buena practica
'use strict';

var middlewares = {
	isLoggedIn : function(req,res,next){
	// si usario logeado puede pasar
		if (req.user){
			next();
			return;
		};
	// si no enviamos a la pagina de inicio
		res.redirect('/');
	}
};

module.exports = middlewares;