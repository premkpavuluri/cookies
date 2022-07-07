const http = require('http');

const startServer = (PORT, router) => {
  const server = http.createServer(router);

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

module.exports = { startServer };
