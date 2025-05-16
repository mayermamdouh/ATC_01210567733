const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization || req.headers.Authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).send("Token required or malformed");
  }
  const token = authToken.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedToken;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    }
    return res.status(401).send("Invalid token");
  }
};
module.exports = verifyToken;
