const express = require('express');
const {Post,User,Comment,P_like} = require('../models');

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
        },{
            model:P_like
        }],
        where:{author:nick}
    }).then((data) => {
        user1.posters = data;
        res.json(user1)}
    );
});

router.get('/setting/:nick', (req,res) => {
    const nick = req.params.nick;
    
})
module.exports = router; 