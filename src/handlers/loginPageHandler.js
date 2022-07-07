const showLoginPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(req.loginForm);
};

const loginPageHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/loginpage') {
    next();
    return;
  }

  if (req.method === 'GET' && !req.session) {
    showLoginPage(req, res);
    return;
  }

  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end('already logged in');
  return;
};

module.exports = { loginPageHandler };
