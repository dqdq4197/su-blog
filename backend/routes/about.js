const express = require('express');
const {Post,User,Comment} = require('../models');

const router = express.Router();

router.get('/:nick', (req,res,next) => {
    const nick = req.params.nick.slice(1,req.params.nick.length)
    
    Post.findAll({
        include: [{
            model:User
        },{
            model:Comment,
        }],
        where:{author:nick}
    }).then((data) => 
    res.json(data)
    );
});

module.exports = router; 