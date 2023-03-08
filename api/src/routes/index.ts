import express from 'express';
import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
const router = express.Router();
import path from 'path';

/* GET home page. */

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Disk');
  },
  // filename: (req, file, cb) => {
  //   cb(null, file.originalname + '-' + Date.now())
  // }
  filename: (req, file, cb) => {
    cb(null, 'test2.pdf')
  }
});

const filter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  let fileFormat = file.mimetype.split('/');
  let fileType = fileFormat[1];
  if (fileType == 'pdf') {
    cb(null, true);
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage: fileStorage, fileFilter: filter });

router.post('/upload', upload.single('upload'), async function (req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.file);
    res.status(200).json({ msg: 'file saved' });
  } catch (err) {
    console.log(err)
    res.status(500)
  }
})

/* File Download*/
router.get('/download', (req, res) => {
  res.download('./Disk/test.pdf')
});

export default router;
