const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//register
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    //validation
    if (!username || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    //check user
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "email already registered please login",
      });
    }
    //hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPasword = await bcrypt.hash(password, salt);
    //crete user
    const user = await userModel.create({
      username,
      email,
      password: hashedPasword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error im Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please provide email or password",
      });
    }
    //check error
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    //check user password || compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }
    //token
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "login success",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
