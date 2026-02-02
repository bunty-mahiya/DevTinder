console.log("starting backend code");
const express=require("express")
const app=express();
app.get("/abc", (req,res)=>{
    res.send("hello request received(get)"); 
})
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

app.listen(3000,()=>{
console.log("sucessfull  listing on part 7777 ");
})