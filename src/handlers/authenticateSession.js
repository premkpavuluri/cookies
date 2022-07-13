const authenticateSession = (req, res, next) => {
  const { pathname } = req.url;

  const isReqGuestBook = pathname === '/guestbook';
  const isReqLogComment = pathname === '/logcomment';
  const isReqComments = pathname === '/comments';
  const isLogout = pathname === '/logout';

  if (!(isReqGuestBook || isReqLogComment || isReqComments || isLogout)) {
    return next();
  }

  if (req.session) {
    return next();
  }

  res.statusCode = 302;
  res.setHeader('Location', '/loginpage');
  res.end('Access denied.');
};

module.exports = { authenticateSession };
