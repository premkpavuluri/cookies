const fs = require('fs');

const injectLoginForm = (req, res, next) => {
  const fileName = './resources/login.html';

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      return next();
    }

    req.loginForm = data;
    next();
  });
};

module.exports = { injectLoginForm };
