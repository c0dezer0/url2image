var fs 			= require('fs');
const imageType = require('image-type');
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

var service = {
	getBase64Image: async (img_path=null)=>{
		var file_data;
		if(fs.existsSync(img_path)){
			file_data = await fs.readFileSync(img_path);
			// var base64 =  new Buffer(file_data).toString('base64');
		}
		else{
			file_data = await fetch(img_path).then(res=> res.buffer());
		}
		var base64 = new Buffer(file_data).toString('base64');
		return `data:${imageType(file_data).mime};base64,${base64}`;
	}
}


module.exports = service;