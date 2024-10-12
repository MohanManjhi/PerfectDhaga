const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user; // Set user information in res.locals
    next();
  } else {
    res.locals.user = null; // Set user information to null if not logged in
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
