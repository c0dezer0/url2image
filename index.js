var fs = require('fs');
var express = require('express');
var app = express();
var PuppeteerService = require('./services').PuppeteerService;

app.get('/', (req, res) => {
    res.send("Go to /screenshot?url=https://www.google.com");
})
app.get('/screenshot', async(req, res) => {
    var url = req.query.url;
    if (!url || !url.length) {
        res.status(400).send("No url present, /screenshot?url=www.google.com");
        return;
    }
    var device = req.query.device;
    var screenshot = await PuppeteerService.screenshot(url, true, device);
    fs.createReadStream(screenshot).pipe(res);
    fs.unlink(screenshot, () => {});
})
app.get('/devices', async(req, res) => {
    var device_list = await PuppeteerService.devices();
    res.send({ devices: device_list });
})
app.listen(process.env.PORT || 9000);