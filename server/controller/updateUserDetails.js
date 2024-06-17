const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");
const UserModel = require("../models/UserModel");
const { check, validationResult } = require("express-validator");

const updateUserDetails =
  // [
  //     // Validation rules
  //     check('name').optional().isString().withMessage('Name must be a string'),
  //     check('email').optional().isEmail().withMessage('Invalid email format'),
  //     // Add other validations as needed

  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log("Validation errors:", errors.array());
    //     return res.status(400).json({
    //         message: "Validation errors",
    //         errors: errors.array(),
    //         error: true,
    //     });
    // }

    try {
      const token = req.cookies.token || "";
      console.log("Token:", token);

      const user = await getUserDetailFromToken(token);
      console.log("User from token:", user);

      if (user.logout) {
        return res.status(401).json({
          message: "Session expired. Please log in again.",
          error: true,
        });
      }

      const { name } = req.body;
      const profile_pic = req.file ? req.file.filename : user.profile_pic;

      // const updatedData = req.body;
      // console.log("Update data:", updatedData);

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        // updatedData,
        { name, profile_pic },
        { new: true, runValidators: true }
      ).select("-password");

      console.log("Updated user:", updatedUser);

      return res.status(200).json({
        message: "User details updated successfully",
        data: updatedUser,
        success: true,
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      return res.status(500).json({
        message: error.message || error,
        error: true,
      });
    }
  };
// ];

module.exports = updateUserDetails;

// const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");
// const UserModel = require("../models/UserModel");
// const multer = require("multer");
// const path = require("path");

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage }).single("profile_pic");

// const updateUserDetails = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Error uploading file",
//         error: true,
//       });
//     }

//     try {
//       const token = req.cookies.token || "";
//       const user = await getUserDetailFromToken(token);

//       const { name } = req.body;
//       const profile_pic = req.file ? req.file.filename : user.profile_pic;

//       const updateUser = await UserModel.updateOne(
//         { _id: user._id },
//         {
//           name,
//           profile_pic,
//         }
//       );
//       const userInformation = await UserModel.findById(user._id);

//       return res.json({
//         message: "user updated successfully",
//         data: userInformation,
//         success: true,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message || error,
//         error: true,
//       });
//     }
//   });
// };

// module.exports = updateUserDetails;
