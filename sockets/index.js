var sockets = function(io){
	require('../apps/projects/controllersocket.js')(io);
};

//Exportamos la funcion 
module.exports = sockets;