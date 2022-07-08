const fs = require('fs');

const loadCommentsHandler = (path) => (request, response, next) => {
  const { pathname } = request.url;

  const isGuestBook = pathname === '/guestbook';
  const isAddComment = pathname === '/logcomment';
  const isComments = pathname === '/comments';
  const isCommentsApi = pathname === '/api/comments';

  if (isAddComment || isGuestBook || isCommentsApi || isComments) {
    const comments = JSON.parse(fs.readFileSync(path, 'utf8'));
    request.guestBook = comments;
  }

  next();
};

module.exports = { loadCommentsHandler }
