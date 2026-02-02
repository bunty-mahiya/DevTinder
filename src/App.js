console.log("starting backend code");
const express=require("express")
const app=express();
app.use("/hello", (req,res)=>{
    res.send("test request received");
})
app.use((req,res)=>{
res.send("hello from backend server")
})
app.listen(3000,()=>{
console.log("sucessfull  listing on part 7777 ");
})