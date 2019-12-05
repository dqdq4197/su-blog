const express = require('express');
const {Post} = require('../models');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'posterImage/')
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);  
      cb(null, path.basename(file.originalname, ext) + "1" + Date.now() + ext); 
    }
  })

var upload = multer({ storage: storage })

router.post('/fetchFile', upload.single('image'), (req,res) => {
  console.log(req.file);
  res.json(req.file.filename);  
})


router.post('/fetchUrl',(req,res) => {
    res.json(req.body.url)
    console.log(req.body.url);
})

router.post('/tumnail',upload.single('poster'), (req,res) => {
  console.log(req.file);
  res.json(req.file.filename);
})

module.exports = router;