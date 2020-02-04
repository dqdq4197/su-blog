const express = require('express');
const {Post,Comment,User} = require('../models');
const db = require('../models');
const router = express.Router();

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

router.post('/parentReply/:id', async(req,res,next) => {
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

router.post('/childReply/:id', async(req,res,next) => {
    const {userId} = req.body;
    res.json('success');    
})

module.exports = router;