const { createRouter } = require('./src/server/router.js');
const { startServer } = require('./src/server/server.js');

const { notFoundHandler } = require('./src/handlers/notFoundHandler.js');
const { serveFileContent } = require('./src/handlers/fileHandler.js');
const { logRequestHandler } = require('./src/handlers/logRequestHandler.js');
const { urlParserHandler } = require('./src/handlers/urlParserHandler');

module.exports = { startServer, createRouter, notFoundHandler, serveFileContent, logRequestHandler, urlParserHandler };
