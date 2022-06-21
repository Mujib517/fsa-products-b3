const bunyan = require('bunyan');
const path = require('path');

const filePath = path.join(__dirname, '..', 'logs', 'app.log');

const logger = bunyan.createLogger({
    name: 'FSA',
    streams: [{
        path: filePath
    }]
});

module.exports = logger;