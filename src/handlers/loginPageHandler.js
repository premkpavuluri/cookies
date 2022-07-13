const showLoginPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(req.loginForm);
};

const loginPageHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/loginpage') {
    return next();
  }

  if (req.session) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end('Already logged in');
    return;
  }

  if (req.method === 'GET') {
    showLoginPage(req, res);
    return;
  }
};

module.exports = { loginPageHandler };
