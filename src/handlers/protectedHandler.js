const protectedHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/protected') {
    return next();
  }

  if (req.session) {
    res.end(`${req.session.username} logged in`);
    return;
  }

  res.statusCode = 401;
  res.end('not logged in');
};

module.exports = { protectedHandler };
