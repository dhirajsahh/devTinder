const express = require("express");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/admin_auth");
const User = require("../models/user");
const { connection } = require("mongoose");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    const toUserId = req.params.userId;
    const status = req.params.status;
    const fromUserId = req.user._id;

    try {
      const allowedStatus = ["ignored", "interested"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        throw new Error("Invalid Status type");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }
      const existingRequest = await ConnectionRequestModel.findOne().or([
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ]);
      if (existingRequest) {
        return res.json({ message: "Connection request already exist" });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();
      res.json({
        message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        connectionRequest,
      });
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
      console.log(err);
    }
  }
);
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        throw new Error("Invalid status");
      }
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        status: "interested",
        toUserId: req.user._id,
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Request accepted successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
      console.log(err);
    }
  }
);
module.exports = requestRouter;
