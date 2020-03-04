const express = require('express');
const {Post,User,Comment,P_like,Social} = require('../models');

const router = express.Router();

router.get('/:nick', async(req,res,next) => {
    const nick = req.params.nick.slice(1,req.params.nick.length)
    const user = await User.findOne({
        include:[{
            model:Social
        }],
        where:{nick},
        attributes:['profile_img','email','intro','nick','id','skills']
    })
    const user1 = user.dataValues;
    await Post.findAll({
        include: [{
            model:User,
            attributes:['profile_img','email','intro','nick','id']
        },{
            model:Comment,
        },{
            model:P_like
        }],
        where:{author:nick}
    }).then((data) => {
        user1.posters = data;
        res.json(user1)}
    );
});

module.exports = router; 