const { Admin } = require("../db");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const name = req.headers.username;
  const pass = req.headers.password;

  Admin.findOne({ username: name, password: pass }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(403).json({
        msg: "Admin does not exist",
      });
    }
  });
}

module.exports = adminMiddleware;
