var express 	= require('express');
var router 		= express.Router({mergeParams: true});
var controller 	= require('./controller');

router.get('/screenshot', controller.getScreenshot);
router.get('/devices', controller.getDevices);
router.post('/card/create', controller.createCard);
router.get('/card/view', controller.viewCard);

module.exports = router;
