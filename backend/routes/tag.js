const express = require('express');
const router = express.Router();
const {Post,User,Comment} = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.post('/getPost', (req,res) => {
    
    const {tag} = req.body;
    
    Post.findAll({
        include: [{
            model: User,
                attributes:['profile_img'],
        },{
            model: Comment
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
        console.log(value)
        res.json(value);
    })
})

router.get('/getTags', (req,res) => {
    Post.findAll({attributes:['hashTags']})
    .then((value) => res.json(value))
})
module.exports = router;