const jwt = require("jsonwebtoken");
const UserModel = require("./model/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
     return res.status(401).send("Please login to access this route");
    }

    const decoded =  await jwt.verify(token, process.env.jwt_secret_key);
    const { _id } = decoded;

    const userFind = await UserModel.findById(_id);
    if (!userFind) {
     return res.status(404).json({ message: "User not found" });
    }
    req.user = userFind;
    next();
  } catch (err) {
   return res.status(401).json({ message: err.message });
  }
};
module.exports = userAuth ;
