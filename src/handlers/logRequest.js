const logRequestHandler = (logger) => (request, response, next) => {
  const timeStamp = new Date().toLocaleString();
  request.timeStamp = timeStamp;

  logger(request.timeStamp, request.method, request.url);
  logger('cookie:', request.headers.cookie, '\n');

  return next();
};

module.exports = { logRequestHandler };
