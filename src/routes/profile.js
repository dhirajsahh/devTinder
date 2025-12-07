const express = require("express");
const { userAuth } = require("../middlewares/admin_auth");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const profileRouter = express.Router();
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const allowedFieldsToUpdates = [
    "firstName",
    "lastName",
    "age",
    "skills",
    "about",
    "gender",
    "photoUrl",
  ];
  const dataToBeUpdated = req.body;

  try {
    const isValid = Object.keys(dataToBeUpdated).every((key) =>
      allowedFieldsToUpdates.includes(key)
    );
    if (!isValid) {
      throw new Error("Updated is not allowed");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).every((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName} your profile is updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const { password } = req.body;
  const loggedInUser = req.user;

  try {
    if (!password) throw new Error("Enter the password");
    if (!validator.isStrongPassword(password)) {
      throw new Error("weak Password");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});
module.exports = profileRouter;
