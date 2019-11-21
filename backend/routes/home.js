const express = require('express');
const {Post} = require('../models');

const router = express.Router();

router.get('/', (req,res) => {
    Post.findAll({
        order:[['createdAt','DESC']],
    }).then((posts) => {
        res.json(posts);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;
