const loginPage = `<html>
<head>
  <title>login Page</title>
</head>
<body>
  <form action="/login" method="post">
    <label for="username">Username</label>
  <input type="text" name="username" id="name">
  <input type="submit" value="login">
  </form>
</body>
</html>`;

const showLoginPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(loginPage);
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
