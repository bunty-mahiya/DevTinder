const express=require("express")
const authRouter=express.Router()
const { validition } = require("../utils/validator");
const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/singup", async (req, res) => {
  const { firstName, lastName, email, password, } = req.body;
  try {
    validition(req);
      const Finduser = await UserModel.findOne({ email: email });
      if(Finduser){
       throw new Error("user already exist");
      }

    const encryptPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: encryptPassword,
    });
    const userSignup= await user.save();
     const token = await user.getJwt()
    res.cookie("token", token,{
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // ✅ 1 din baad expire
  httpOnly: true , // JS se cookie access nahi hogi (security ke liye)
  sameSite: "None",
   secure: true, 
});
    res.json({message:"user registered sucessfully",data:userSignup});
  } catch (err) {
    res.status(401).send("Error :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!validator.isEmail(email)) {
      throw new Error("email is not correct");
    }
    if (!user) {
      throw new Error("invalid user");
    }

    const isPassword = await user.comperes(password)
    if (!isPassword) {
      throw new Error("Invalid user");
    }
    const token = await user.getJwt()
    res.cookie("token", token,{
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // ✅ 1 din baad expire
  httpOnly: true  // JS se cookie access nahi hogi (security ke liye)
});
    res.send(user);
  } catch (Error) {
    res.status(401).send("Error :" + Error.message);
  }
});

authRouter.post("/logout",(req,res)=>{
res.cookie("token",null,{
    expires: new Date(Date.now())
})
res.send("logout sucessfull!!")
})

module.exports=authRouter;