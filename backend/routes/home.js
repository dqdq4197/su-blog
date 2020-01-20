const express = require('express');
const {Post,User} = require('../models');

const router = express.Router();

router.get('/', async(req,res) => {
    Post.findAll({
        include: {
            model: User,
            attributes:['profile_img'],
        },
        order:[['createdAt','DESC']],
    }).then((posts) =>{
        res.json(posts);
    })
    
})

module.exports = router;
