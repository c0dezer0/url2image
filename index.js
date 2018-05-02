require('./app/globals')();

var fs      = require('fs');
var express = require('express');
var app     = express();

var routes  = require('./app/routes');

routes(app); 
    
var PORT    = _config.PORT;
app.listen(PORT, ()=>{
    console.log(`Server running :http://localhost:${PORT}`)
});