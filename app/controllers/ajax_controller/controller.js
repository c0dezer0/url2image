var fs 					= require('fs');
var ejs                 = require('ejs');
var PuppeteerService 	= require(_dir.SERVICES).PuppeteerService;
var ImageService        = require(_dir.SERVICES).ImageService;

var controller = {
	getScreenshot: async(req, res) => {
        var url = req.query.url;
        if (!url || !url.length) {
            res.status(400).send("No url present, <a href='/ajax/screenshot?url=www.google.com'>/ajax/screenshot?url=www.google.com</a><br />");
            return;
        }
        var device 		= req.query.device;
        var screenshot 	= await PuppeteerService.screenshot(url, true, device);
        fs.createReadStream(screenshot).pipe(res);
        fs.unlink(screenshot, () => {});
	},
	
	getDevices: async(req, res)=>{
		var devices = await PuppeteerService.devices();
        res.send({ devices });
	},

    createCard: async(req, res)=>{
        var body = req.body;
        var {title, content, image_url, device} = body;
        
        image_url = await ImageService.getBase64Image(image_url);
        var html = await ejs.renderFile(__dirname+"/pilot.ejs", {image_url, title, content}, {async:true})
        
        // res.send(html);
        // return;
        var screenshot = await PuppeteerService.screenshot(html, true, body.device);
        fs.createReadStream(screenshot).pipe(res);
        fs.unlink(screenshot, () => {});
        
            
    },
    viewCard: async(req, res)=>{
        var body = req.query;
        var {title, content, image_url, device, template} = body;

        res.render(`${_dir.VIEWS}/pilot.ejs`, {title, content, image_url});
    }
}

module.exports = controller;