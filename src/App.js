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
const http = require("http")
const server = http.createServer(app)
app.use(express.json()); // middleware for read req.body
require("./utils/cronSchedule");
const handleSocket = require("./utils/socketIo");
const chatRouter = require("./routers/chat");
app.use(cookie()); /// middleware for read req.cookie
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/",chatRouter)
handleSocket(server)
dbConnect()
  .then(() => {
    console.log("database connected successfully");
    server.listen(process.env.PORT,"0.0.0.0", () => {
      console.log("sucessfull  listing on part " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("error while connecting to database", err);
  });
