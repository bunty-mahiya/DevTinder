require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const UserModel = require("./model/User");
const cookie = require("cookie-parser");
const authRouter=require("./routers/authRouter")
const profileRouter=require("./routers/profileRouter")
const requestRouter =require("./routers/requestRouter")
const userRouter =require("./routers/userRouter")
const cors = require("cors");
app.use(express.json()); // middleware for read req.body

app.use(cookie()); /// middleware for read req.cookie
app.use(cors({
  origin: "http://localhost:5173", // tera frontend URL
  credentials: true,
}))
// app.get("/feed", async (req, res) => {
//   try {
//     const feedAllData = await UserModel.find({});
//     res.send(feedAllData);
//   } catch (err) {
//     res.status("400").send("something is wrong" + err);
//   }
// });

// filter one  data from dataBase
app.get("/user", async (req, res) => {
  const usersEmail = req.body.email;
  try {
    const find = await UserModel.findOne({ email: usersEmail });
    if (!find) {
      res.status(400).send("User not found");
    } else {
      res.send(find);
    }
    res.send(find);
  } catch (err) {
    res.status(400).send("somthing is wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const deleteUser = await UserModel.findByIdAndDelete({ _id: userId });
    if (!deleteUser) {
      res.status(404).send("User not found");
    }
    res.send("Succesfull Delete");
  } catch (erro) {
    res.status(400).send("something went wrong");
  }
});

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
dbConnect()
  .then(() => {
    console.log("database connected successfully");
    app.listen(process.env.PORT,"0.0.0.0", () => {
      console.log("sucessfull  listing on part " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("error while connecting to database", err);
  });
