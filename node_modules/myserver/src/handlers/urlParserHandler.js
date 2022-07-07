const urlParserHandler = (request, response, next) => {
  const { host } = request.headers;
  request.url = new URL(`http://${host}${request.url}`);

  const { searchParams } = request.url;
  const queryParams = {};

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  queryParams.date = request.timeStamp;

  request.url.queryParams = queryParams;
  return next();
};

module.exports = { urlParserHandler };
