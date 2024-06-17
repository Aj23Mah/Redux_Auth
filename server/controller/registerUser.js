const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Already user exits",
        error: true,
      });
    }

    // password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);
    const payload = {
      name,
      email,
      profile_pic: profilePic,
      password: hashpassword,
    };
    const user = new UserModel(payload);
    const userSave = await user.save();

    return res.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    console.error("Error during user registration:", error);  
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = registerUser
