const express = require("express");
const requestRouter = express.Router();
const userAuth  = require("../MiddleAuth");
const connectionModel = require("../model/connectionRequest");
const UserModel = require("../model/User");
const { sendInterestedEmail } = require("../utils/EmailService");

// sender  request bhej rha hai kisi user ko
requestRouter.post(
  "/request/send/:status/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const senderId = req.user._id;
      const receiverId = req.params.receiverId;
      const status = req.params.status;

      const allowedRequest = ["interested", "ignore"];
      if (!allowedRequest.includes(status)) {
        return res.send("invalid request");
      }
      const toReceiver = await UserModel.findById(receiverId);
      if (!toReceiver) {
        return res.json({ message: "User not Found" });
      }
      const connectionRequest = new connectionModel({
        senderId,
        receiverId,
        status,
      });
      const existingConnection = await connectionModel.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });
      if (existingConnection) {
        return res.send("Connection already exist");
      }
      const data = await connectionRequest.save();
       if (status === "interested") {
        await sendInterestedEmail(
          toReceiver.email,        // receiver ka email
          toReceiver.firstName,    // receiver ka naam
          req.user.firstName       // sender ka naam
        );
      }
      res.json({
        message: "connection succesfull :" +status,data
      });
    } catch (err) {
      res.status(400).send("Error : " + err);
    }
  },
);
// sender ne request bheji or receiver check kar rha hai aapne account par and they have two option accepted userRequest rejected userRequest
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req,res) => {
    try {
      const loginUserId = req.user;
      const { requestId, status } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("status not allowed");
      }
      const connectionRequest = await connectionModel.findOne({
        _id: requestId,
        receiverId: loginUserId._id,
        status: "interested",
      });
     
      if (!connectionRequest) {
        return res.status(404).send("connectionRequest is not Found")
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "connection request ", status, data });
    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  },
);

module.exports = requestRouter;
