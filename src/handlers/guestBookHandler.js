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

module.exports = { serveGuestBook };
