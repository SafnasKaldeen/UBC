const multer = require('multer');

// Set up storage engine for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'E:/UOM/My-CODE_RUSH/#projects/UGAA BOOKS CLOUD/UBC/views/assets/img/NIC_Images'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

// Create the multer instance with the storage engine
const upload = multer({ storage });

module.exports = upload;
