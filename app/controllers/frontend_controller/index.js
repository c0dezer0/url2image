var express 	= require('express');
var router 		= express.Router({mergeParams: true});
var controller 	= require('./controller');

router.get("/*", controller.renderApp);

module.exports = router;