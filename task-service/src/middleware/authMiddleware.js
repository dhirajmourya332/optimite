const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //split the authorization token from header and just get the token not the "Bearer "
    const token = req.headers.authorization.split(" ")[1];

    //verfiy the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //add the userid in req header
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
