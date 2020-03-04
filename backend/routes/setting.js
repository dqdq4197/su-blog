const express = require('express');
const router = express.Router();
const {User,Social} = require('../models');


router.get('/:nick', (req,res) => {
    const nick = req.params.nick;

    User.findOne({
        where:{nick},
        attributes:['skills','intro']
        })
        .then((result)=> res.json(result)) 
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

//social 정보 변경or 추가
router.post('/social/:name', (req,res) => {
    const name = req.params.name;
    const {data,id} = req.body;

    return Social
        .findOne({ where:{userId:id} })
        .then(item => {
            if (!item) {
                // Item doesn't exist, so we create it

                // Custom promise to add more data to the record
                // Being saved (optional)
                switch (name){
                    case 'facebook': 
                        return Social.create({facebook:data, userId:id})
                    case 'github':
                        return Social.create({git:data, userId:id})
                    case 'instagram':
                        return Social.create({instagram:data, userId:id})
                    case 'twitter':
                        return Social.create({twitter:data, userId:id})
                    case 'home':
                        return Social.create({home:data, userId:id})
                    default :
                     return false;
                }
            }

            // Item already exists, so we update it
            switch (name){
                case 'facebook': 
                    return Social.update({facebook:data},{where:{userId:id}})
                case 'github':
                    return Social.update({git:data},{where:{userId:id}})
                case 'instagram':
                    return Social.update({instagram:data},{where:{userId:id}})
                case 'twitter':
                    return Social.update({twitter:data},{where:{userId:id}})
                case 'home':
                    return Social.update({home:data},{where:{userId:id}})
                default :
                 return false;
            }
        }).then(() => {
            Social.findOne({where:{userId:id}}).then((result) => {
                res.json(result)
            })
        })
})

router.patch('/intro/:id', (req,res) => {
    const {data} = req.body;
    const id = req.params.id;
    User.update({intro:data},{where:{id}})
        .then((result) => {
            res.json(data);
        })
})
module.exports = router;