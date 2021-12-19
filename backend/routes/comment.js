const express = require('express');
const {Post,Comment,User} = require('../models');
const db = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
router.get('/:id', async(req,res) => {
    if(req.params.id) {
        let object;
        await Comment.findAll({where:{postId:req.params.id}}).then((result) => {
            object = result;
             Promise.all( 
                 result.map(async(value,i)=> {
                    await User.findOne({where:{nick:value.dataValues.author}, attribute:['profile_img','id']}).then(call=>{
                        object[i].dataValues.profile_img = call.dataValues.profile_img;
                        object[i].dataValues.userId = call.dataValues.id;
                    })  
                }))
            .then((dd) => {
                res.json(object);
            })
        })
    }
});

router.put('/parentReply/:id', async(req,res,next) => {
    const {parentValue, postId} = req.body;

    if(parentValue && postId && req.params.id) {
        await Comment.findAndCountAll({where:{postId}}).then(result => {
            db.Comment.create({
                seq:1,
                content:parentValue,
                postId,
                author:req.params.id
            })
        });
    }
    res.send('success');
})

router.put('/childReply/:id', async(req,res,next) => {
    const {replyId,childValue, postId} = req.body;
    await Comment.create({
        seq:2,
        content:childValue,
        postId,
        author:req.params.id,
        parent:replyId
    })
    res.json('success');    
})

router.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    Comment.destroy({
        where: {
            [Op.or] :[{
                id,
            },{
                parent:id,
            }]
        }
    }).then(()=> res.send('success'))
})

module.exports = router;    