
const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://buntypopping348_db_user:7iehGvx386ZlnsDA@cluster1.oaxhdgh.mongodb.net/")
const dbConnect=async()=>{
  await mongoose.connect("mongodb+srv://buntypopping348_db_user:7iehGvx386ZlnsDA@cluster1.oaxhdgh.mongodb.net/")
}
// dbConnect().then(()=>{
//     console.log("database connected successfully"); 
// }).catch((err)=>{
//     console.log("error while connecting to database",err);
// })
module.exports=dbConnect;