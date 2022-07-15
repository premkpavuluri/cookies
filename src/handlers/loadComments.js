const fs = require('fs');

const loadCommentsHandler = (path) => (request, response, next) => {
  const pathname = request.url;
  const endpoints = ['/guest-book', '/add-comment', '/comments'];

  if (endpoints.includes(pathname)) {
    const comments = JSON.parse(fs.readFileSync(path, 'utf8'));
    request.dbPath = path;
    request.guestBook = comments;
  }

  next();
};

module.exports = { loadCommentsHandler }
