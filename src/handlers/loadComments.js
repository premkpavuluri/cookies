const fs = require('fs');

const loadCommentsHandler = (path) => (request, response, next) => {
  const pathname = request.url;

  const isGuestBook = pathname === '/guest-book';
  const isAddComment = pathname === '/logcomment';
  const isComments = pathname === '/comments';

  if (isGuestBook || isAddComment || isComments) {
    const comments = JSON.parse(fs.readFileSync(path, 'utf8'));
    request.dbPath = path;
    request.guestBook = comments;
  }

  next();
};

module.exports = { loadCommentsHandler }
