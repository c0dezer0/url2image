var puppeteer   = require('puppeteer');
var fs          = require('fs');
const devices   = require('puppeteer/DeviceDescriptors');

var service = {
    screenshot: async(url = null, fullPage = true, device = null) => {
        if (!url || !url.length) {
            return new Error('No url present');
        }
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        if (device && devices[device]) {
            await page.emulate(devices[device]);
        }
        await page.goto(url);

        var file_path = _dir.TEMP + `/screenshot-${(new Date()).getTime()}_${Math.floor(Math.random()*10000)}-full.png`;

        await page.screenshot({
            path: file_path,
            fullPage
        });
        await browser.close();

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