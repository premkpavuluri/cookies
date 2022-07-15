const loginPageHandler = (req, res, next) => {
  if (req.session) {
    res.redirect('/');
    return;
  }

  res.type('html').end(req.loginForm);
};

module.exports = { loginPageHandler };
