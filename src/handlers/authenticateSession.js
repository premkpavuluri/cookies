const authenticateSession = (req, res, next) => {
  if (req.session) {
    return next();
  }

  res.redirect('/login');
};

module.exports = { authenticateSession };
