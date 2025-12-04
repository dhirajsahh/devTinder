const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const Port = 3000;
app.use(express.json());
app.post("/signup", async (req, res) => {
  const userDetails = req.body;
  try {
    const userData = new User(userDetails);
    await userData.save();
    res.json({
      message: "User added successfully",
      user: userData,
    });
  } catch (err) {
    console.log("Error", err.message);
    res.json({
      message: "Error while putting data in database",
      error: err.message,
    });
  }
});

app.get("/getUser", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
app.get("/getUserById", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
app.patch("/updateUser", async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { firstName: name },
      { upsert: true, returnDocument: "after" }
    );
    console.log(updatedUser);

    res.send("User updated successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
app.delete("/deleteById/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const data = await User.findByIdAndDelete(id);
    console.log(data);
    res.send("user is deleted Successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
app.delete("/delete", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await User.findOneAndDelete({ email });
    console.log(data);
    res.send("user is deleted Successfully");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
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
