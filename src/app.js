const express = require("express");
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const app = express();
const Port = 3000;
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
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
