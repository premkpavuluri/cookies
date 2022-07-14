const fs = require('fs');

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

module.exports = { addComment };
