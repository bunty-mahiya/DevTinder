const express = require("express");
const profileRouter = express.Router();
const userAuth  = require("../MiddleAuth");
const { validitionOfUpdate } = require("../utils/validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.json({ massage: `Hello ${req.user.firstName}`, data: req.user });
  } catch (err) {
    res.status(500).json({ error: "Error :" + err.message });
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isRequireField = validitionOfUpdate(req);
    if (!isRequireField) {
      throw new Error("invalid edit requies");
    }
    const loginInUser = req.user;
    Object.keys(req.body).forEach((key) => loginInUser[key] = req.body[key]);
    await loginInUser.save()
     res.json({message:`${loginInUser.firstName} ,Update your proFile`,data:loginInUser})
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = profileRouter;
