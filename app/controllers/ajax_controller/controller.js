var fs 					= require('fs');
var PuppeteerService 	= require(_dir.SERVICES).PuppeteerService;


var controller = {
	getScreenshot: async(req, res) => {
        var url = req.query.url;
        if (!url || !url.length) {
            res.status(400).send("No url present, /screenshot?url=www.google.com");
            return;
        }
        var device 		= req.query.device;
        var screenshot 	= await PuppeteerService.screenshot(url, true, device);
        fs.createReadStream(screenshot).pipe(res);
        fs.unlink(screenshot, () => {});
	},
	
	getDevices: async (req, res)=>{
		var devices = await PuppeteerService.devices();
        res.send({ devices });
	}
}

module.exports = controller;