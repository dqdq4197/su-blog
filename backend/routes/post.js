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
    outputData.blocks.map((res) => {
        console.log(res);
    })
    if(userId){
        Post.create({
            content:data,
            userId,
            author: nick,
            tumnailTitle,
            hashTags,
            skills,
            tumnailImg
        })
    }
    res.json(data);
})

router.get('/:id/:author', (req,res) => {
    const post_content = Post.findOne({where: {id: req.params.id},attribute:['id']});
    post_content.then((response) => {
        res.json(response.dataValues.content);
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

router.post('/reply/:id', async(req,res,next) => {
    const {value, postId} = req.body;
    let seq;
    if(value && postId && req.params.id) {
        await Comment.findAndCountAll({where:{postId}}).then(result => {
            seq= result.count + 1;
            db.Comment.create({
                seq,
                content:value,
                postId,
                author:req.params.id
            })
        });
    }
})


module.exports = router;