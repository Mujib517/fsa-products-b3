const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: 'FSA' });

module.exports = logger;