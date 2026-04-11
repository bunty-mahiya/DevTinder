const jwt = require("jsonwebtoken");
const UserModel = require("./model/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please login to access this route");
    }

    const decoded =  await jwt.verify(token,"Devtinder@328$2");
    const { _id } = decoded;

    const userFind = await UserModel.findById(_id);
    if (!userFind) {
      throw new Error("User not found");
    }
    req.user = userFind;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
module.exports = userAuth ;
