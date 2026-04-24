
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
  throw new Error("Password must contain at least 1 uppercase letter, 1 number, and 1 special character (!@#$%^&*).")
  }

}

 function validitionOfUpdate(req){
 const requireField=['firstName',"lastName","skill","gender","about","age","photoURL"]
 const isRequireField=Object.keys(req.body).every((k)=>requireField.includes(k))
 return isRequireField
 }
module.exports={validition,validitionOfUpdate}