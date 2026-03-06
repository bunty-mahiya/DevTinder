console.log("starting backend code");
const express = require("express");
const app = express();
const {auth}=require("./MiddleAuth")
const dbConnect=require("./config/database")
const UserModel=require("./model/User")

app.use(express.json())
//multiple routes handler for single route
// app.get("/abc", [
//   (req, res, next) => {
//     console.log("fisrt handler called");
//     // res.send("hello request received(get) first handler");
//     next();
//   },
//   (req, res, next) => {
//     console.log("2rd handler called");
//     next();
//     // res.send("hello request received(get) 2rd handler");
//   },
//   (req, res, next) => {
//     console.log("3rd handler called");
//     next();
//     // res.send("hello request received(get) 3rd handler");
//   },
//   [
//     (req, res, next) => {
//       console.log("4th handler called");
//       res.send("hello request received(get) 4th handler");
//     },
//   ],
// ]);
// app.get("/user/:user", (req,res)=>{
//     res.send("hello request received(get)");
//     console.log(req.params);
// })
// app.post("/hello",(req,res)=>{
//     res.send("hello from backend server(post)")
// })
// app.use((req,res)=>{
//     res.send("hello request received");
// })

//middleware with authentication
// app.use("/admin/pass",auth,(req,res)=>{
//  res.send({name:"admin",pass:"12345"})
// })
// app.use("/admin",(req,res)=>{
// res.send("middlerware route")
// })

// app.use("/user/login",(req,res)=>{
//   res.send("login sucessfull")
// })
// app.use("/user/register",auth,(req,res)=>{
//   res.send("register sucessfull") 
// })

// take all data from dataBase
app.get("/feed" , async(req,res)=>{
try{
  const feedAllData=await UserModel.find({})
   res.send(feedAllData)
}catch(err){
 res.status("400").send("something is wrong" + err)
}
}) 

 // filter one  data from dataBase
app.get("/user" , async(req,res)=>{
 const usersEmail=req.body.email 
  try{
    const find= await UserModel.findOne({email:usersEmail})
    if(!find){
      res.status(400).send("User not found")
    }else{
      res.send(find)
    }
      res.send(find)
  }catch(err){
  res.status(400).send("somthing is wrong")
  }
}) 

 // add some date from body(client)
app.post("/singup", async (req,res)=>{
  const user=new UserModel(req.body)
  console.log(user);
  // new UserModel({
  //   fistName:"himanshu",
  //   lastName:"gupta",
  //   email:"himanshu@gmail.com",
  //   password:"17645",
  //   age:25,
  // })
  try{
    await user.save();
    res.send("user registered sucessfully");
  }catch(err){
    console.log("somthing wrong" + err);
  }
}) 

// delete data
app.delete("/user" , async(req,res)=> {
 const userId=req.body.id;
 try{
  const deleteUser= await UserModel.findByIdAndDelete({_id:userId})
   if (!deleteUser) {
   res.status(404).send("User not found");
  }
  res.send("Succesfull Delete")
 }catch(erro){
  res.status(400).send("something went wrong")
 }
})

// update Data
app.patch("/user/update" , async (req,res)=>{
const userId=req.body.id
const data=req.body
try{
    const userUpdate= await UserModel.findByIdAndUpdate({_id:userId},data,{
      returnDocument:"after",
      runValidators:true
    },)
    res.send("succesfull user update")
    console.log(userUpdate)
}catch(err){
  res.status(400).send("something went wrong"+err)
}
})
dbConnect().then(()=>{
    console.log("database connected successfully"); 
    app.listen(3000, () => {
    console.log("sucessfull  listing on part 3000");
});
}).catch((err)=>{
    console.log("error while connecting to database",err);
})

