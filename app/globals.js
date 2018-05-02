module.exports = function() {
    var dir = {};
    dir.APP = __dirname;
    dir.CONTROLLERS = dir.APP + '/controllers';
    dir.SERVICES = dir.APP + '/services';
    dir.TEMP = dir.APP + '/temp';
    global._dir = dir;
    global._config = require('../config');
}