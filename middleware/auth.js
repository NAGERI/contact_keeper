const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");
  // Check if not token, document the authorization used
  const bearer_token = token.split(" ")[1];
  if (!bearer_token) {
    return res.status(401).json({ msg: "No token, Authorization denied." });
  }
  try {
    const decoded = jwt.verify(bearer_token, process.env.jwtSecret);
    req.user = decoded.user; // will have access to this in the route
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token not valid." });
  }
};
