const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    const msg = "Missing token";
    return res.status(401).json({ msg });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    console.log(err);
    if (err) {
      const msg = "Missing token";
      return res.status(403).json({ msg, data: err });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
