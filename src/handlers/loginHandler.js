const createSession = (username) => {
  const time = new Date();
  const sessionId = time.getTime();
  return { username, time, sessionId };
};

const isUserValid = (username, usersDb) => {
  return usersDb[username];
};

const handleLoginUser = (req, res, sessions) => {
  const { username } = req.bodyParams;
  const session = createSession(username);
  const { sessionId } = session

  sessions[sessionId] = session;

  res.statusCode = 302;
  res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  res.setHeader('Location', '/guestbook');
  res.end(`Welcome ${username}`);
  return;
};

const loginHandler = (sessions, usersDb) => (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/login') {
    return next();
  }

  const { username } = req.bodyParams;
  if (req.method === 'POST' && isUserValid(username, usersDb)) {
    return handleLoginUser(req, res, sessions);
  }

  res.statusCode = 302;
  res.setHeader('Location', '/')
  res.end('Home page');
};

module.exports = { loginHandler };
