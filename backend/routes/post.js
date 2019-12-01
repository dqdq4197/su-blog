const express = require('express');
const {Post} = require('../models');
const router = express.Router();

router.post('/upload', (req,res,next) => {
    const {outputData, userId, nick} =req.body;
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
            author: nick,
        })
    }
    res.json(data);
})

router.get('/:id/:author', (req,res) => {
    console.log(req.params.id);
    const post_content = Post.findOne({where: {id: req.params.id},attribute:['id']});
    post_content.then((response) => {
        res.json(response.dataValues.content);
    })
})

router.post('/delete/:id/:author', async(req,res,next) => {
    try {
        console.log(req.params.author);
        await Post.destroy({where:{id:req.params.id}})
        .then(() => {
            res.send('포스터를 삭제하였습니다.');
        }).catch((error) => {
            console.log('삭제할 수 없습니다.', error)
        })
    }catch(error) {
        console.log(error);
        return next(error);
    }
});


module.exports = router;