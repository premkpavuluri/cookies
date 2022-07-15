const createSession = (username) => {
  const time = new Date();
  const sessionId = time.getTime();
  return { username, time, sessionId };
};

const isUserValid = (username, usersDb) => {
  const user = usersDb[username];

  return user !== undefined;
};

const handleLoginUser = (req, res, sessions) => {
  const { username } = req.bodyParams;
  const session = createSession(username);
  const { sessionId } = session;
  sessions[sessionId] = session;

  res.cookie('sessionId', sessionId).end(`Welcome ${username}`);
};

const loginHandler = (sessions, usersDb) => (req, res, next) => {
  const { username } = req.bodyParams;

  if (isUserValid(username, usersDb)) {
    return handleLoginUser(req, res, sessions);
  }

  res.status(401).end('Invalid credentials');
};

module.exports = { loginHandler };
