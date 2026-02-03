const mongoose =require("mongoose")

const schema=new mongoose.Schema({
    fistName:{type:String},
    lastName:{type:String},
    email:{type:String},
    password:{type:String},
    age:{type:Number,required:true
}})

const UserModel=mongoose.model("users",schema)
module.exports=UserModel