const express = require("express");
const userRouter = express.Router();
const userAuth = require("../MiddleAuth");
const User =  require("../model/User")
const conntionRequest = require("../model/connectionRequest");
const User_Save_Data = "firstName lastName about skill gender age photoURL";

userRouter.get("/user/request/receive", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;
    const reviewPenddingRequest = await conntionRequest
      .find({
        receiverId: loginUser._id,
        status: "interested",
      })
      .populate("senderId", User_Save_Data);
    if (!reviewPenddingRequest) {
      throw new Error("no Pending request");
    }
    res.json({
      message: "connection Request succesfull",
      data: reviewPenddingRequest,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const userLogin = req.user;
    const userConnection = await conntionRequest
      .find({
        $or: [
          {
            receiverId: userLogin._id,
            status: "accepted",
          },
          {
            senderId: userLogin._id,
            status: "accepted",
          },
        ],
      })
      .populate("receiverId", User_Save_Data)
      .populate("senderId", User_Save_Data);

    const data = userConnection.map((row) => {
      if (row.senderId._id.toString() == userLogin._id.toString()) {
        return row.receiverId;
      } else {
        return row.senderId;
      }
    });

    res.json({ data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
      limit = limit > 50? 50:limit;
      const skip = (page-1)*limit
    const conncationRequest = await conntionRequest.find({
      $or: [{ senderId: loginUser._id }, { receiverId: loginUser._id }],
    }).select("senderId receiverId");

    const hideUsersFromFeed = new Set() 
     conncationRequest.forEach((req)=>{
      hideUsersFromFeed.add(req.senderId.toString())
      hideUsersFromFeed.add(req.receiverId.toString())
     })
      const user = await User.find({
        $and:[{_id:{$nin:Array.from(hideUsersFromFeed)}},
          {
            _id:{$ne:loginUser._id}
          }]
      }).select(User_Save_Data).skip(skip).limit(limit)
    res.send(user)
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = userRouter;
