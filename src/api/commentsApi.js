const serveComments = (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(req.guestBook));
};

module.exports = { serveComments };
