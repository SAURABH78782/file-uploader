const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
const port = 3002;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['jpg', 'png', 'jpeg'], 
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
   
    res.status(200).json({
      message: 'File uploaded successfully',
      imageUrl: req.file.path,
    });
  } else {
    res.status(400).json({
      message: 'File upload failed',
    });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
