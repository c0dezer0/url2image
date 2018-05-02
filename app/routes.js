var controllers = require(_dir.CONTROLLERS);
var express 	= require('express');

module.exports 	= (app)=>{
	app.use('/ajax', controllers.AjaxController)

	app.get('/', (req, res) => {
        res.send("Go to /screenshot?url=https://www.google.com");
    })
}