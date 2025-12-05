const express = require("express");

const { userAuth } = require("../middlewares/admin_auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  try {
    res.send(user.firstName + " is Sending connection");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});

module.exports = requestRouter;
