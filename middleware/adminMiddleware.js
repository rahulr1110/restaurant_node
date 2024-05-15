const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");

module.exports = async (req, res,next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype != "admin"){
      return res.status(401).send({
        success: false,
        message: "only admin access",
      });
    }else{
      next()
    }
      
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "un authorized access",
      error,
    });
  }
};
