// Buena practica
'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/slidethis');

module.exports = mongoose;