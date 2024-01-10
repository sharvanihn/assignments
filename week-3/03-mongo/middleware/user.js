const { User } = require("../db");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const name = req.headers.username;
  const pass = req.headers.password;

  User.findOne({ username: name, password: pass }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(403).json({
        msg: "User does not exist",
      });
    }
  });
}

module.exports = userMiddleware;
