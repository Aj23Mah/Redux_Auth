const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const UserModel = require("./models/UserModel");

// const upload = require('./upload');
// const fs = require('fs');

// const multer = require('multer');
const path = require("path");

require("dotenv").config();
const app = express();

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Create the multer instance
// const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3333;
const uri = process.env.DB_URI;

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Route for file uploads
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded!' });
//   }
//   res.json({ message: 'File uploaded successfully!', file: req.file });
// });

app.get("/", async (req, res) => {
  res.json({ message: "API is working!" });
});

// api endpoints
app.use("/api", router);

app.listen(PORT, async () => {
  console.log(`server running on port: ${PORT}`);
  let conn;
  try {
    conn = await mongoose.connect(uri);
    console.log("DB is now connected");
  } catch (e) {
    console.error(e);
  }
});
