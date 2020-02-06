var path = require('path');
module.exports = function() {
    var dir = {};
    dir.APP = __dirname;
    dir.CONTROLLERS = dir.APP + '/controllers';
    dir.SERVICES = dir.APP + '/services';
    dir.TEMP = dir.APP + '/temp';
    dir.VIEWS = path.resolve(dir.APP, '../views');
    global._dir = dir;
    global._config = require('../config');
}