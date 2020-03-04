const express = require('express');
const {Post,User,P_like} = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
router.post('/upload', (req,res,next) => {
    const {outputData, userId, isHide,nick,tumnailTitle,hashTags,skills,tumnailImg} =req.body;
    //var sysdate = new Date(outputData.time);
    
    if(userId){
        Post.create({
            content:outputData,
            userId,
            author: nick,
            tumnailTitle,
            hashTags,
            skills,
            tumnailImg,
            isHide
        }).then(() => {Post.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
        }).then( postId =>
                 res.json({ postId:postId[0].dataValues.id , nick}))})
                
    }
})

router.post('/modify/:posterId', async(req,res,next) => {
    const {outputData, isHide,userId, nick,tumnailTitle,hashTags,skills,tumnailImg} =req.body;
    console.log(isHide)
    await Post.update({
        content:outputData,
        userId,
        author:nick,
        tumnailTitle,
        hashTags,
        skills,
        tumnailImg,
        isHide
    },{where: {id: req.params.posterId}}
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
            if(response) {
                res.json(response.dataValues);
            } else {
                res.status(404).send('fail')
            }
    })
})

router.delete('/delete/:id/:author', async(req,res,next) => {
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

router.post('/getLike', (req,res) => {
    const {postId, user_nick} = req.body;
    P_like.findAll({where:{postId}})
    .then((send) => {
        P_like.findOne({
            where:{
            [Op.and] : [{
                postId,
            },{
                u_Id:user_nick,
            }]}
        }).then((one) => {
            res.json({send,one})
        })
        
    })
})

router.post('/setLike', (req,res) =>{ 
    const {postId, user_nick} = req.body;
    if(user_nick) {
        P_like.findOne({
            where:{
                [Op.and] : [{
                    postId,
                },{
                    u_Id:user_nick,
                }]
        }}).then((as) => {
            if(as) {
                P_like.destroy({
                        where:{
                            [Op.and] : [{
                                postId,
                            },{
                                u_Id:user_nick,
                            }]
                        }
                    })
            } else {
                P_like.create({
                    postId,
                    u_Id:user_nick
                })
            }
            }).then(() => res.json('success'))
    }
})



module.exports = router;