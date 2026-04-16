const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://buntypopping348_db_user:7iehGvx386ZlnsDA@cluster1.oaxhdgh.mongodb.net/")
const dbConnect = async () => {
  await mongoose.connect(
   process.env.DB_URL,
  );
};

module.exports = dbConnect;
