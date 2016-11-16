//En este archivo pondremos las rutas de los controladores

// Buena practica
'use strict';

//Treaemos el controlador
var router_main = require('../apps/main/controller.js'),
	router_user = require('../apps/user/controller.js'),
	router_projects = require('../apps/projects/controller.js');

//Creamos una variable que contenga una funcion
// y reciba el servidor

var routers = function(server){
	//Le pasamos las rutas al servidor
	server.use('/', router_main);
	server.use('/', router_user);
	server.use('/', router_projects);
};

//Exportamos la funcion 
module.exports = routers;