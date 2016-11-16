var sockets = function(io, iduser){
	require('../apps/projects/controllersocket.js')(io, iduser);
};

//Exportamos la funcion 
module.exports = sockets;