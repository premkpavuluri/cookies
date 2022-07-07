const authenticateSession = (req, res, next) => {
  if (req.session) {
    next();
    return;
  }

  res.statusCode = 302;
  res.setHeader('Location', '/login');
  res.end('Access denied.');
};

module.exports = { authenticateSession };
