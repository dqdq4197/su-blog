const express = require('express');
const router = express.Router();
const {User} = require('../models');


router.get('/:nick', (req,res) => {
    const nick = req.params.nick;

    User.findOne({where:{nick},attributes:['skills','intro']}).then((result)=> res.json(result)) 
})
router.patch('/:nick',(req,res) => {
    let {skill} = req.body;
    const nick = req.params.nick;
    console.log(skill.join(','), nick);
    skill = skill.join(',')

    User.update({
        skills:skill,    
    },{
        where:{nick}
    }).then(() =>{ 
        res.send('modify');
    })
})

module.exports = router;