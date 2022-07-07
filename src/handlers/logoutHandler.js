const logout = (req, res, sessions) => {
  const { sessionId } = req.session;

  delete sessions[sessionId];
  res.setHeader('Set-Cookie', `sessionId=${sessionId};Max-Age=0`);
  res.end('Logout');
};

const logoutHandler = (sessions) => (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/logout') {
    return next();
  }

  logout(req, res, sessions);
};

module.exports = { logoutHandler };
