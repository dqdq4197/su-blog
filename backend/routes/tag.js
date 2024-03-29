const express = require('express');
const router = express.Router();
const {Post,User,Comment, P_like} = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
const {cache} = require('./middlewares');

router.get('/getPost/:tag', (req,res) => {
    
    const tag = req.params.tag;
    
    Post.findAll({
        include: [{
            model: User,
            attributes:['profile_img'],
        },{
            model: Comment
        },{
            model: P_like
        }],
        where:{
            [Op.or]: [
                {hashTags: {
                    [Op.like]: `%,${tag},%`}
                },
                {hashTags: {
                    [Op.like]: `%,${tag}%`}
                },
                {hashTags: {
                    [Op.like]: `%${tag},%`}
                },
                {hashTags: tag }
            ]
    }}).then((value) => {
        res.json(value);
    })
})

router.get('/getTags',cache(10), (req,res) => {
    Post.findAll({attributes:['hashTags']})
    .then((value) => res.json(value))
})
module.exports = router;