const express = require("express");
const chatRouter = express.Router();
const userAuth = require("../MiddleAuth");
const Chat = require("../model/chatSchema");
chatRouter.get("/chat/:userId", userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const loginUserId = req.user._id;
    let existingChat = await Chat.findOne({
      participant: { $all: [loginUserId, userId] },
    }).populate({
      path: "message.senderId",
      select: "firstName lastName",
    });

    if (!existingChat) {
      existingChat = new Chat({
        participant: [loginUserId, userId],
        message: [],
      });
      await existingChat.save();
    }
res.send({ message: existingChat.message })}
 catch (err) {
    console.log(err);
  }
});

module.exports = chatRouter;
