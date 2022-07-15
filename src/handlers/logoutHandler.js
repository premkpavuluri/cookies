const logout = (req, res, sessions) => {
  const { sessionId } = req.session;

  delete sessions[sessionId];
  res.setHeader('Set-Cookie', `sessionId=${sessionId};Max-Age=0`);
  res.statusCode = 302;
  res.setHeader('Location', '/login');
  res.end('Logout');
};

const logoutHandler = (sessions) => (req, res, next) => {
  logout(req, res, sessions);
  next();
};

module.exports = { logoutHandler };
