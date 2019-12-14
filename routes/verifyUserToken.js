const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("user-token");
  if (!token) return res.status(401).send("access denied");

  try {
    const verified = jwt.verify(token, process.env.USER_KEY);
    res.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
