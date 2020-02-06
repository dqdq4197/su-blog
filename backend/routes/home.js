const express = require('express');
const {Post,User,Comment} = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

router.post('/', async(req,res) => {
    const {value} = req.body;
    if(value !== "All" && value) {
        Post.findAll({
            include: [{
                model: User,
                attributes:['profile_img'],
            },{
                model: Comment
            }
            ],
            where:{skills: {[Op.like] : '%' + value.toLowerCase() + '%'}},

            order:[['createdAt','DESC']],
        }).then((posts) =>{
            res.json(posts);
        })
    } else {
        Post.findAll({
            include: [{
                model: User,
                attributes:['profile_img'],
            },{
                model: Comment
            }
            ],

            order:[['createdAt','DESC']],
        }).then((posts) =>{
            res.json(posts);
        })
    }
})

module.exports = router;
