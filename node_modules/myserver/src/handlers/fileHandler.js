const fs = require('fs');
const path = require('path');

const MIMETYPES = {
  '.jpg': 'image/jpeg',
  '.html': 'text/html',
  '.pdf': 'application/pdf',
  '.css': 'text/css',
  '.json': 'application/json'
}

const determineMimeType = (extension) => {
  return MIMETYPES[extension];
};

const serveFileContent = (resourcePath) => (request, response, next) => {
  let { pathname } = request.url;

  if (pathname === '/' && request.method === 'GET') {
    pathname = '/index.html';
  }

  const fileName = `${resourcePath}${pathname}`;

  fs.readFile(fileName, (err, data) => {
    if (err) {
      return next();
    }

    const extension = path.extname(fileName);
    response.setHeader('Content-Type', determineMimeType(extension));
    response.end(data);
  });

  return true;
};

module.exports = { serveFileContent };
