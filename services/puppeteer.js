var puppeteer = require('puppeteer');
var fs = require('fs');
const devices = require('puppeteer/DeviceDescriptors');

var service = {
    screenshot: async(url = null, fullPage=true, device=null) => {
        if (!url || !url.length) {
            return new Error('No url present');
        }
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        var file_path = __dirname+`/screenshot-${(new Date()).getTime()}-full.png`;

        await page.screenshot({
            path: file_path,
            fullPage
        });
        await browser.close();

        return file_path;

    },
    devices: async()=>{
        // console.log(devices);
        return JSON.stringify(devices);
    }
}

module.exports = service;