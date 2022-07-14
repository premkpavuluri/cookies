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

  res.statusCode = 200;
  res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  res.end(`Welcome ${username}`);
};

const loginHandler = (sessions, usersDb) => (req, res, next) => {
  const { username } = req.bodyParams;

  if (req.method === 'POST') {
    if (isUserValid(username, usersDb)) {
      return handleLoginUser(req, res, sessions);
    }

    res.statusCode = 401;
    res.end('Invalid credentials');
    return;
  }

  res.statusCode = 302;
  res.setHeader('Location', '/loginpage')
  res.end('');
};

module.exports = { loginHandler };
