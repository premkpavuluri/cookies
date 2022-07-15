const express = require('express');

const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { logRequestHandler } = require('./handlers/logRequest.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { loadLoginForm } = require('./handlers/loadLoginForm.js');
const { loginPageHandler } = require('./handlers/loginPageHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { serveGuestBook } = require('./handlers/guestBookHandler.js');
const { loadCommentsHandler } = require('./handlers/loadComments.js');
const { authenticateSession } = require('./handlers/authenticateSession.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { addComment } = require('./handlers/addCommentsHandler.js');
const { serveComments } = require('./api/commentsApi.js');

const createApp = (appConfig, sessions, users) => {
  const app = express();

  app.use(parseBodyParams);
  app.use(logRequestHandler(appConfig.logger));
  app.use(injectCookie);
  app.use(injectSession(sessions));
  app.get('/loginpage', loadLoginForm, loginPageHandler);
  app.post('/login', loginHandler(sessions, users));
  app.get('/logout', authenticateSession, logoutHandler(sessions));

  app.use(loadCommentsHandler(appConfig.db));
  app.get('/guest-book', authenticateSession, serveGuestBook);
  app.post('/logcomment', authenticateSession, addComment);
  app.get('/comments', authenticateSession, serveComments);

  app.use(express.static(appConfig.resource));

  return app;
};

module.exports = { createApp };
