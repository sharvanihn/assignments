const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (verified.username) {
      next();
    } else {
      res.status(403).json({ msg: "You are not athenticated" });
    }
  } catch (e) {
    res.status(403).json({ msg: "Incorrect Inputs" });
  }
}

module.exports = userMiddleware;
