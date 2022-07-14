const showLoginPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(req.loginForm);
};

const loginPageHandler = (req, res, next) => {
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
