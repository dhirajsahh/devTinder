const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const Port = 3000;

app.post("/signup", async (req, res) => {
  const userDetails = {
    //firstName: "virat",
    lastName: "kohli",
    email: "vk@gmail.com",
    password: "anuksa",
    age: 30,
    gender: "Male",
  };
  try {
    const doc = new User(userDetails);
    await doc.save();
    res.json({
      message: "User added successfully",
      user: doc,
    });
  } catch (err) {
    console.log("Error", err.message);
    res.json({
      message: "Error while putting data in database",
      error: err.message,
    });
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(Port, () => {
      console.log(`App is listening in Port ${Port}`);
    });
  })
  .catch(() => {
    console.log("Error connecting the database");
  });
