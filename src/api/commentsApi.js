const serveComments = (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(req.guestBook));
};

const commentsApi = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname === '/comments' && req.method === 'GET') {
    return serveComments(req, res);
  }

  next();
};

module.exports = { commentsApi };
