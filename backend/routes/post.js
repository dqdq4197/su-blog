const express = require('express');
const {Post,User} = require('../models');
const router = express.Router();

router.post('/upload', (req,res,next) => {
    const {outputData, userId, nick,tumnailTitle,hashTags,skills,tumnailImg} =req.body;
    //var sysdate = new Date(outputData.time);
    
    if(userId){
        Post.create({
            content:outputData,
            userId,
            author: nick,
            tumnailTitle,
            hashTags,
            skills,
            tumnailImg
        }).then(() => {Post.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
        }).then( postId =>
                 res.json({ postId:postId[0].dataValues.id , nick}))})
                
    }
})

router.post('/modify/:posterId', async(req,res,next) => {
    const {outputData, userId, nick,tumnailTitle,hashTags,skills,tumnailImg} =req.body;
    await Post.update({content:outputData,
        userId,
        author:nick,
        tumnailTitle,
        hashTags,
        skills,
        tumnailImg},{where: {id: req.params.posterId}}
    ).then(() => res.send('수정완료'))
})

router.get('/:id/:author', (req,res) => {
    Post.findOne({
        include:[{
            model : User,
            attributes:['profile_img']
        }],
        where: {id: req.params.id}})
        .then((response) => {
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