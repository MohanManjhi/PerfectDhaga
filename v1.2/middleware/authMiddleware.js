// const authMiddleware = (req, res, next) => {
//   if (req.session.user) {
//     res.locals.user = req.session.user; // Set user information in res.locals
//     next();
//   } else {
//     res.locals.user = null; // Set user information to null if not logged in
//     res.redirect('/login');
//   }
// };

// module.exports = authMiddleware;


const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;  // Set the user information in req.user
    res.locals.user = req.session.user; // Set user information in res.locals for templates
    next();  // Proceed to the next middleware/controller
  } else {
    res.locals.user = null; // Set user information to null if not logged in
    res.redirect('/login');  // Redirect to login page if not logged in
  }
};

module.exports = authMiddleware;
