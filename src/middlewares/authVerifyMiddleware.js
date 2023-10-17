const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let token = req.headers["token"];
  jwt.verify(token, "SecretKey123456789", (error, decoded) => {
    if (error) {
      console.log(token);
      res.status(401).json({ status: "unauthorized" });
    } else {
      let email = decoded["data"];
      console.log(email);
      req.headers.email = email;
      next();
    }
  });
};
