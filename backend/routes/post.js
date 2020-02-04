const express = require('express');
const {Post,Comment} = require('../models');
const db = require('../models');
const router = express.Router();

router.post('/upload', (req,res,next) => {
    const {outputData, userId, nick,tumnailTitle,hashTags,skills,tumnailImg} =req.body;
    //var sysdate = new Date(outputData.time);
    const data = outputData.blocks.map((res)=> {
        return res;
    })
    if(userId){
        Post.create({
            content:outputData,
            userId,
            author: nick,
            tumnailTitle,
            hashTags,
            skills,
            tumnailImg
        })
    }
    res.json(outputData);
})

router.post('/modify/:posterId', async(req,res,next) => {
    const {outputData, userId, nick,tumnailTitle,hashTags,skills,tumnailImg} =req.body;
    await Post.update({content:outputData,
        userId,
        author:nick,
        tumnailTitle,
        hashTags,
        skills,
        tumnailImg},{where: {id: req.params.posterId}})
})

router.get('/:id/:author', (req,res) => {
    const post_content = Post.findOne({where: {id: req.params.id},attribute:['id']});
    post_content.then((response) => {
        res.json(response.dataValues);
    })
})

router.post('/delete/:id/:author', async(req,res,next) => {
    try {
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