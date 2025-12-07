const express = require("express");
const { userAuth } = require("../middlewares/admin_auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();
//get all the pending request for the logged in user
const usersafeData = "firstName lastName age gender skills about photoUrl";
userRouter.get("/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const requestReceived = await ConnectionRequestModel.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", usersafeData);
    if (requestReceived.length == 0) {
      return res.json({ message: "No Request Received" });
    }
    return res.json({ message: "Received Request", data: requestReceived });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const connections = await ConnectionRequestModel.find({
      $or: [{ toUserId: loggedInUserId }, { fromUserId: loggedInUserId }],
      status: "accepted",
    })
      .populate("fromUserId", usersafeData)
      .populate("toUserId", usersafeData);
    if (connections.length == 0) {
      return res.status(404).json({ message: "No connection found" });
    }
    const data = connections.map((list) => {
      if (list.fromUserId._id.toString() === loggedInUserId._id.toString()) {
        return list.toUserId;
      }
      return list.fromUserId;
    });
    return res.json({
      message: "connection list",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    //User should see all the user cards expect
    //  his own card
    // his connections
    // ignored people
    // already sent the connection request
    const loggedInUserId = req.user._id;

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    }).select("fromUserId toUserId");

    const hideFromUser = new Set();

    connectionRequest.map((req) => {
      hideFromUser.add(req.toUserId._id.toString());
      hideFromUser.add(req.fromUserId._id.toString());
    });
    const hiddenIdArray = Array.from(hideFromUser);
    const users = await User.find({
      _id: { $nin: hiddenIdArray },
    })
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
    console.log(err);
  }
});
module.exports = userRouter;
