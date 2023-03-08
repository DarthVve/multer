import { Request, Response, NextFunction} from 'express';
import express from 'express';
const multer  = require('multer')

const app = express()

const upload = multer({ dest: 'uploads/' })

app.post('/profile', upload.single(''), function (req:Request, res:Response, next:NextFunction) {
   
  })