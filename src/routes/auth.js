const express = require("express");

const authRouter = express.Router();
const { validateSignUpData } = require("../utilis/validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
authRouter.post("/signup", async (req, res) => {
  const data = req.body;
  const {
    firstName,
    lastName,
    email,
    password,
    photoUrl,
    skills,
    age,
    gender,
  } = req.body;
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "photoUrl",
      "skills",
      "age",
      "gender",
    ];
    const isAllowed = Object.keys(data).every((key) =>
      allowedFields.includes(key)
    );
    if (!isAllowed) {
      throw new Error("Unwanted fileds not allowed");
    }
    //validate data
    validateSignUpData(req);
    //encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      photoUrl,
      skills,
      age,
      gender,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All field is mandatory");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    const token = await user.getJWT();

    res.cookie("token", token);
    res.send("User login successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});

module.exports = authRouter;
