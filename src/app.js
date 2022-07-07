const { createRouter, logRequestHandler, notFoundHandler, urlParserHandler }
  = require('myserver');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');

const sessions = {};

const parseCookie = (cookiesString) => {
  const cookies = {};
  if (!cookiesString) {
    return cookies;
  }

  cookiesString.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name.trim()] = value.trim();
  });

  return cookies;
};

const injectCookie = (req, res, next) => {
  req.cookies = parseCookie(req.headers.cookie);
  next();
};

const injectSession = (req, res, next) => {
  const { sessionId } = req.cookies;
  req.session = sessions[sessionId];
  next();
};

const protectedHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/protected') {
    return next();
  }

  if (req.session) {
    res.end(`${req.session.username} logged in`);
    return;
  }

  res.statusCode = 401;
  res.end('not logged in');
};

const loginPage = `<html>
<head>
  <title>login</title>
</head>
<body>
  <form action="/login" method="post">
    <label for="username">Username</label>
  <input type="text" name="username" id="name">
  <input type="submit" value="submit">
  </form>
</body>
</html>`;


const showLoginPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(loginPage);
};

const generateSessionId = () => {
  return new Date().getTime();
};

const createSession = (username, sessionId) => {
  const time = new Date();
  return { username, time, sessionId };
};

const loginHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/login') {
    next();
    return;
  }

  if (req.session) {
    res.statusCode = 301;
    res.setHeader('Location', '/protected');
    res.end('already logged in');
    return;
  }

  if (req.method === 'GET') {
    showLoginPage(req, res);
    return;
  }

  const username = req.bodyParams.username;

  if (req.method === 'POST' && username) {
    const sessionId = generateSessionId();
    const session = createSession(username, sessionId);
    sessions[sessionId] = session;

    res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
    res.end('sucessfully logged in');
  }
};

const handlers = [
  urlParserHandler,
  parseBodyParams,
  logRequestHandler,
  injectCookie,
  injectSession,
  loginHandler,
  protectedHandler,
  notFoundHandler];

const router = createRouter(handlers);

module.exports = { router };
