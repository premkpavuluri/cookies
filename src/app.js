const express = require('express');

const { logRequestHandler } = require('./handlers/logRequest.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { injectLoginForm } = require('./handlers/loadLoginForm.js');
const { loginPageHandler } = require('./handlers/loginPageHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { serveGuestBook } = require('./handlers/guestBookHandler.js');
const { loadCommentsHandler } = require('./handlers/loadComments.js');
const { authenticateSession } = require('./handlers/authenticateSession.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { addComment } = require('./handlers/addCommentsHandler.js');

const serveComments = (req, res) => res.json(req.guestBook);

const injectBodyParams = (req, res, next) => {
  req.bodyParams = req.body;
  next();
};

const createApp = (appConfig, sessions, users) => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(injectBodyParams);
  app.use(logRequestHandler(appConfig.logger));
  app.use(injectCookie);
  app.use(injectSession(sessions));

  app.get('/login', injectLoginForm, loginPageHandler);
  app.post('/login', loginHandler(sessions, users));
  app.get('/logout', authenticateSession, logoutHandler(sessions));

  app.use(loadCommentsHandler(appConfig.db));
  app.get('/guest-book', authenticateSession, serveGuestBook);
  app.post('/add-comment', authenticateSession, addComment);
  app.get('/comments', authenticateSession, serveComments);

  app.use(express.static(appConfig.resource));

  return app;
};

module.exports = { createApp };
