const express = require("express");
const { userAuth } = require("../middlewares/admin_auth");

const profileRouter = express.Router();
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});
module.exports = profileRouter;
