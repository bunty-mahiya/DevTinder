
const validator=require("validator")
 const  validition = (req)=> {
  const{firstName,lastName,email,password}=req.body
 
  if(!firstName || !lastName){
  throw new Error("Enter firstName and lastName")
  }
  else if(!validator.isEmail(email)){
  throw new Error("Enter valid Email")
  }
  else if(!validator.isStrongPassword(password)){
  throw new Error("Enter strong Password")
  }

}

module.exports={validition}