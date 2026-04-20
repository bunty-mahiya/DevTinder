const mongoose = require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3, 
      maxlength: 50,
    },
    lastName: { type: String, minlength: 3, maxlength: 50 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      minlenght: 5,
      maxlength: 25,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("enter valid email " + value);
        }
      },
    },

    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("enter strong password " + value);
        }
      },
    },

    age: { type: Number, min: 18 },

    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("enter valid phone no: " + value);
        }
      },
    },

    about: {
      type: String,
      default: "this is default about section",
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female", "other"],
    // },
    photoURL: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/vector-illustration-boy-staff-admin_976269-431.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("enter valid URL " + value);
        }
      },
    },
    skill: {
      type: [String],
    },
  },
  { timestamps: true },
);

schema.methods.getJwt = async function(){
 const user=this;
 const token =jwt.sign({_id:user._id},process.env.jwt_secret_key,{expiresIn:"1d"})
 return token; 
}
schema.methods.comperes= async function(userInputPass){
const user = this
const isPassword = await bcrypt.compare(userInputPass,user.password) 
return isPassword
}
const UserModel = mongoose.model("users", schema);

module.exports = UserModel;
