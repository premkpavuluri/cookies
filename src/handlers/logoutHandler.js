const logoutHandler = (sessions) => (req, res, next) => {
  const { sessionId } = req.session;

  delete sessions[sessionId];

  res.clearCookie('sessionId').redirect('/login');
};

module.exports = { logoutHandler };
