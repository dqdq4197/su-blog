const express = require('express');
const {Post,Comment,User} = require('../models');

const router = express.Router();

router.get('/:id', async(req,res) => {
    let array;
    if(req.params.id) {
        await Comment.findAll({where:{postId:req.params.id}}).then((result) => {
            result.map(async(value,i)=> {
                await User.findOne({where:{nick:value.author}, attribute:['profile_img']}).then(call=>{
                result.push(call.dataValues.profile_img);
                })  
            })
            array=result;
        })
        console.log(array)
        res.json(result);
        
    }
});

module.exports = router;