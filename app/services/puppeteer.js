var puppeteer   = require('puppeteer');
var fs          = require('fs');
const devices   = require('puppeteer/DeviceDescriptors');

var isUrl = function(url){
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}
var service = {
    screenshot: async(input_data = null, fullPage = true, device = null) => {
        if (!input_data || !input_data.length) {
            return new Error('No Input data present');
        }
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        if (device && devices[device]) {
            await page.emulate(devices[device]);
        }
        try{
            await page.goto(input_data);
        }
        catch(e){
            await page.emulate({viewport:{isMobile:true, width:720, height:100}, userAgent:"Mooc"});
            await page.setContent(input_data);
             // await page.waitForNavigation({ waitUntil:'load' });
        }
        

        var file_path = _dir.TEMP + `/screenshot-${(new Date()).getTime()}_${Math.floor(Math.random()*10000)}-full.png`;
        try {
            await page.screenshot({
                path: file_path,
                fullPage
            });
            await browser.close();
        }
        catch(e){
            console.error(e);
            return null;
        }
            

        return file_path;

    },
    devices: async() => {
        var device_map = [];
        for (var key in devices) {
            if (isNaN(key)) {
                device_map.push(key);
            }
        }
        return device_map;
    }
}
module.exports = service;