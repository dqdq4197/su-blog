const express = require('express');
const {Post,User,Comment,P_like} = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

router.get('/:categories', async(req,res) => {
    const value = req.params.categories;

    if(value !== "All" && value && value !== 'undefined') {
        Post.findAll({
            include: [{
                model: User,
                attributes:['profile_img'],
            },{
                model: Comment
            },{
                model: P_like
            }
        ],
        where:{
            [Op.and] : [{
                skills: {[Op.like] : '%' + value.toLowerCase() + '%'},
            },{
                isHide: false,
            }]
        },
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
                model: Comment,
            },{
                model:P_like
            }
            ],
            where:{
              isHide: false,  
            },
            order:[['createdAt','DESC']],
        }).then((posts) =>{
            res.json(posts);
        })
    }
})

module.exports = router;
