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

    res.statusCode = 302;
    res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
    res.setHeader('Location', '/guestbook');
    res.end(`Welcome ${username}`);
    return;
  }
};

module.exports = { loginHandler };
