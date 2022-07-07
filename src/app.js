const { createRouter, logRequestHandler, notFoundHandler, urlParserHandler }
  = require('myserver');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { protectedHandler } = require('./handlers/protectedHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { serveFileContent } = require('./handlers/fileHandler.js');
const { handleGuestBook } = require('./handlers/guestBookHandler.js');
const { loadCommentsHandler } = require('./handlers/loadComments.js');
const { authenticateSession } = require('./handlers/authenticateSession.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');

const sessions = {};
const sessionHandler = injectSession(sessions);
const loginUserHandler = loginHandler(sessions);
const logout = logoutHandler(sessions);

const handlers = [
  urlParserHandler,
  parseBodyParams,
  logRequestHandler,
  injectCookie,
  sessionHandler,
  loginUserHandler,
  protectedHandler,
  authenticateSession,
  loadCommentsHandler('./db/comments.json'),
  handleGuestBook,
  serveFileContent('./public'),
  logout,
  notFoundHandler];

const router = createRouter(handlers);

module.exports = { router };
