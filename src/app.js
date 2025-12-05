const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utilis/validator");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const app = express();
const Port = 3000;
app.use(express.json());

app.post("/signup", async (req, res) => {
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
    console.log(hashPassword);

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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All field is mandatory");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    res.send("User login successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});
app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const allowedUpdates = ["userId", "photoUrl", "skills", "age", "gender"];
    const isAllowed = Object.keys(data).every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isAllowed) {
      throw new Error("Updates not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});
/*
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
    console.log("error while updating", err.message);
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
*/
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
