require('./app/globals')();
require('es6-promise').polyfill();
require('isomorphic-fetch');

var fs      	= require('fs');
var express 	= require('express');
var app     	= express();
var bodyParser 	= require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var routes  = require('./app/routes');

routes(app); 
    
var PORT    = _config.PORT;
app.listen(PORT, ()=>{
    console.log(`Server running :http://localhost:${PORT}`)
});