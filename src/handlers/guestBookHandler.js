const fs = require('fs');

const formatComment = ({ name, comment, date }) => {
  return `<li>${date} ${name}:${comment}</li>`;
};

const formatComments = (comments) => {
  return comments.map(formatComment).join('');
};

const serveGuestBook = (request, response) => {
  const template = fs.readFileSync('./resources/template.html', 'utf8');
  const comments = formatComments(request.guestBook);
  const html = template.replace('__COMMENTS__', comments);

  response.setHeader('Content-Type', 'text/html');
  response.end(html);
  return true;
};

const persistComments = (comments, fileName) => {
  fs.writeFileSync(fileName, JSON.stringify(comments), 'utf8');
  return true;
};

const addComment = (request, response) => {
  const date = request.timeStamp;
  const { username: name } = request.session;
  const comment = { name, comment: request.bodyParams.comment, date };

  request.guestBook.unshift(comment);

  persistComments(request.guestBook, request.dbPath);

  response.statusCode = 201;
  response.end('success');
  return true;
};

const handleGuestBook = (request, response, next) => {
  const { pathname } = request.url;

  if (pathname === '/logcomment' && request.method === 'POST') {
    return addComment(request, response);
  }

  if (pathname === '/guestbook' && request.method === 'GET') {
    return serveGuestBook(request, response);
  }

  next();
};

module.exports = { handleGuestBook };
