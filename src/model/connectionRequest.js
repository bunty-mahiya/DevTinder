const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref:"users"
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref:"users"
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true },
);
connectionSchema.index({senderId:1,receiverId:1})
connectionSchema.pre("save", async function(){
  const connection = this;
  if (connection.senderId.equals(connection.receiverId)) {
   throw new Error("don't connect to yourself");
  }
});
const connectionModel = new mongoose.model(
  "connectionRequest",
  connectionSchema,
);
module.exports = connectionModel;
