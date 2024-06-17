const express = require("express");
const multer = require('multer');
const path = require('path');

const registerUser = require("../controller/registerUser");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const loginUser = require("../controller/loginUser");

const router = express.Router();

const upload = require('../middlewares/uploadsDir')
// Set up storage for uploaded files (should be same as in your main server file)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });
  
//   const upload = multer({ storage: storage });



//create user api
router.post("/register", upload.single('profile_pic'), registerUser);

//check login user 
router.post('/login', loginUser);

//login user details
router.get('/user-details', userDetails);

//log out user 
router.get('/logout', logout);

//update user details
router.post('/update-user', upload.single('profile_pic'), updateUserDetails);

module.exports = router;
