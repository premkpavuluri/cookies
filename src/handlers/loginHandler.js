const createSession = (username) => {
  const time = new Date();
  const sessionId = time.getTime();
  return { username, time, sessionId };
};

const isUserValid = (username, usersDb) => {
  return usersDb[username];
};

const loginHandler = (sessions, usersDb) => (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/login') {
    next();
    return;
  }

  const { username } = req.bodyParams;
  if (req.method === 'POST' && isUserValid(username, usersDb)) {
    const session = createSession(username);
    const { sessionId } = session
    sessions[sessionId] = session;

    res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  }

  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end('');
};

module.exports = { loginHandler };
