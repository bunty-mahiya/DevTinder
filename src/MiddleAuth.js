
const auth=(req,res,next)=>{
    const password ="1235";
    if (password == 12345) {
        next()
        console.log("Authentication sucessfull");
    }else{
        res.status(500).send("ooppss something wrong")
    }
}

module.exports={auth}
