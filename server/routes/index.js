const express = require('express');
const router = express.Router();
const multer = require('multer');

/* File Upload */
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Disk')
  },
  // filename: (req, file, cb) => {
  //   cb(null, file.originalname + '-' + Date.now())
  // }
  filename: (req, file, cb) => {
    cb(null, 'test.pdf')
  }
});

const filter = (req, file, cb) => {
  let fileFormat = file.mimetype.split('/');
  let fileType = fileFormat[1];
  if (fileType == 'pdf') {
    cb(null, true);
  } else {
    cb(null, false)
  }
};

const upload = multer({ storage: fileStorage, fileFilter: filter })


router.post('/upload', upload.single('upload'), function(req, res) {
  console.log(req.file);
  res.send("Upload Successful")
});

/* File Download*/
router.get('/download', (req, res) => {
  res.download('./Disk/test')
});

module.exports = router;
