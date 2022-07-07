const { createRouter, logRequestHandler, notFoundHandler, urlParserHandler }
  = require('myserver');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { protectedHandler } = require('./handlers/protectedHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { serveFileContent } = require('./handlers/fileHandler.js');

const sessions = {};
const sessionHandler = injectSession(sessions);
const loginUserHandler = loginHandler(sessions);

const handlers = [
  urlParserHandler,
  parseBodyParams,
  logRequestHandler,
  injectCookie,
  sessionHandler,
  loginUserHandler,
  protectedHandler,
  serveFileContent('./public'),
  notFoundHandler];

const router = createRouter(handlers);

module.exports = { router };
