const authenticateSession = (req, res, next) => {
  if (req.session) {
    return next();
  }

  res.statusCode = 302;
  res.setHeader('Location', '/loginpage');
  res.end('Access denied.');
};

module.exports = { authenticateSession };
