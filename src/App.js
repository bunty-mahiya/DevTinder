console.log("starting backend code");
const express = require("express");
const app = express();
//multiple routes handler for single route
app.get("/abc", [
  (req, res, next) => {
    console.log("fisrt handler called");
    // res.send("hello request received(get) first handler");
    next();
  },
  (req, res, next) => {
    console.log("2rd handler called");
    next();
    // res.send("hello request received(get) 2rd handler");
  },
  (req, res, next) => {
    console.log("3rd handler called");
    next();
    // res.send("hello request received(get) 3rd handler");
  },
  [
    (req, res, next) => {
      console.log("4th handler called");
      res.send("hello request received(get) 4th handler");
    },
  ],
]);
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

app.listen(3000, () => {
  console.log("sucessfull  listing on part 7777 ");
});
