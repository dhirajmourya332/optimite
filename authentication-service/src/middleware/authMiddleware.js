const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //split the auth token by space and get just token and noth the "Bearer"
    const token = req.headers.authorization.split(" ")[1];

    //verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //add the userid from decoded token in request object for other request handlers
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
