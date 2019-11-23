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
    outputData.blocks.map((res) => {
        console.log(res);
    })
    console.log('data :',data);
    console.log(userId);
    if(userId){
        Post.create({
            content:data,
            userId: userId,
        })
    }
    res.json(data);
})
router.get('/:id', (req,res) => {
    console.log(req.params.id);
    post_content = Post.findOne({where: {id: req.params.id},attribute:['id']});
    post_content.then((response) => {
        res.json(response.dataValues.content);
    })
    
})
module.exports = router;