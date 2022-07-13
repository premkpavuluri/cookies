const authenticateSession = (req, res, next) => {
  const { pathname } = req.url;

  const isReqGuestBook = pathname === '/guestbook';
  const isReqLogComment = pathname === '/logcomment';
  const isReqComments = pathname === '/comments';

  if (!(isReqGuestBook || isReqLogComment || isReqComments)) {
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
