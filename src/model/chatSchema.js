const mongoose = require("mongoose");
const chatMessage = new mongoose.Schema(
  {
    //sare massage is me aayenge
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const chatSchema = new mongoose.Schema(
  {
    participant: [
      { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    ], // room me kon kon rhega
    message: [chatMessage],
  },
  { timestamps: true },
);
const Chat = new mongoose.model("Chat", chatSchema);
module.exports = Chat;
