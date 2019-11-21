const express = require('express');
const {Post} = require('../models');
const router = express.Router();

router.post('/upload', (req,res,next) => {
    const {outputData, userId} =req.body;
    console.log(outputData);
    //var sysdate = new Date(outputData.time);
    const data = outputData.blocks.map((res)=> {
        return res;
    })
    console.log(userId);
    if(userId){
        Post.create({
            content:data,
            userId: userId,
        })
    }
    res.json(data);
})
module.exports = router;