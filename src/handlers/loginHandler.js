const generateSessionId = () => {
  return new Date().getTime();
};

const createSession = (username, sessionId) => {
  const time = new Date();
  return { username, time, sessionId };
};

const loginHandler = (sessions) => (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/login') {
    next();
    return;
  }

  const username = req.bodyParams.username;

  if (req.method === 'POST' && username) {
    const sessionId = generateSessionId();
    const session = createSession(username, sessionId);
    sessions[sessionId] = session;

    res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  }

  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end('sucessfully logged in');
};

module.exports = { loginHandler };
