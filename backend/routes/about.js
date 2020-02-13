const express = require('express');
const {Post,User,Comment} = require('../models');

const router = express.Router();

router.get('/:nick', async(req,res,next) => {
    const nick = req.params.nick.slice(1,req.params.nick.length)
    const user = await User.findOne({where:{nick}})
    const user1 = user.dataValues;
    await Post.findAll({
        include: [{
            model:User
        },{
            model:Comment,
        }],
        where:{author:nick}
    }).then((data) => {
        user1.posters = data;
        res.json(user1)}
    );
});

module.exports = router; 