// Buena practica
'use strict';

//Traemos el modulo de express
var express = require('express'),
//Instancia de express
    server = express(),
    // socketio
    io = require('socket.io')
    						.listen(
								server.listen(3000, function(){
									console.log('listening on *:3000');
								})
							),
	//Importamos Swig
	swig = require('swig'),
	//Necesitamos esto para obetener los
	// datos que vienen pos POST
	bodyParser = require('body-parser'),
	//requerimos cookieParser
	cookieParser = require('cookie-parser'),
	//vamos a requerir el flash que sirve para
	// enviar mensajes de error a las vistas
	flash = require('connect-flash'),
	//requerimos express sesion
	session = require('express-session'),
	// requerimos redis que es nuesto garage
	// de memoria para seciones (store)
	// antes debe estar declarado sesion
	RedisStore = require('connect-redis')(session);

//Vamos a usar bodyparser
server.use(bodyParser.json()); // recibimos pet json
server.use(bodyParser.urlencoded({ extended: true }));
//cookieParser y session se necesitan para que
// funcione passport
//Le decimos al servidor que vamos a
// usar bodyParser
server.use(cookieParser());
//Le decimos al servidor que vamos a usar
// el express session
server.use(session({
	store: new RedisStore({
		host : '127.0.0.1',
		port : 6379,
		db : 1
	}),
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

//Le decimos al servidor que vamos a usar connect flash
server.use(flash());

//vamos a utilizar passport
// el require de passport se debe poner dps
// porque necesita cookies y session
require('./config/passport')(server);

//Indicamos a el servidor que vamos a usar swig
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
//Aquí asignamos la ruta de donde tendremos nuestras rutas
// __dirname es una variable que devuelve la ruta de donde nos
// encontramos 
server.set('views', __dirname + '/views');
//Desactivamos el cache de los templates 
// (En produccion es mejor activarlo)
swig.setDefaults({ cache: false});

//Indicamos al servidor donde vamos a tener nuestros
// archivos estaricos
server.use(express.static(__dirname + '/public'));

server.use(function(req, res, next){
	// la variable user se envia a todos los
	// templates de nuestro proyecto
	server.locals.user = req.user;
	
	// debemos poner next para que no se quede pensando
	next();
});

require('./routers/')(server);
require('./sockets/')(io);



