const express = require("express");

const app = express();
app.use("/api", (req, res) => {
  res.send("Hello army");
});
app.use("/", (req, res) => {
  res.send("Hello world123");
});

app.listen(3000, () => {
  console.log("App is listening in port 3000");
});
