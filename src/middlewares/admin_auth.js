const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      throw new Error("Token is not valid!!!!!!");
    }
    const decodedMessage = jwt.verify(token, "MYDEVTINDERAPP");
    const { id } = decodedMessage;
    if (!id) {
      throw new Error("Invalid token");
    }
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
    console.log(err.message);
  }
};
module.exports = { userAuth };
