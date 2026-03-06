const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    firstName: { type: String, lowercase: true, trim: true },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    password: { type: String, },

    age: { type: Number, min: 18 },

    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
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

    photo: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/vector-illustration-boy-staff-admin_976269-431.jpg",
    },
    skill:{
      type:[String]
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", schema);

module.exports = UserModel;

