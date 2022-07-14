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

const loadLoginForm = (req, res, next) => {
  // const { pathname } = req.url;

  // if (pathname !== '/loginpage') {
  //   return next();
  // }

  injectLoginForm(req, res, next);
};

module.exports = { loadLoginForm };
