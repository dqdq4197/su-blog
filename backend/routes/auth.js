const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const multer = require('multer');
const nodemailer = require('nodemailer');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const smtpTransporter = require('nodemailer-smtp-transport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {User} = require('../models');
const path = require('path');
const {userinfo} = require('../passport/kakaoStrategy');


const router = express.Router();
router.post('/login',isNotLoggedIn, (req,res,next) => {
  passport.authenticate('local',(error,user,info) => {
    console.log(user);
    if(error) {
      res.status(500).json({
        message: error || 'Oops, something happened!',
      });
      console.log('loginerror');
      return next(error);
    }
    if(!user) {
      console.log('loginError');
      return res.status(500).json({
        message: error || info.message,
      });
    }
    return req.login(user, (loginError) => {
      if(loginError) {
        return (
          next(loginError),
          console.log('continue')
        );
      }
      return (
        
        res.json({
          id:user.id,
          email:user.email,
          nick:user.nick,
          profile_img:user.profile_img,
          createdAt:user.createdAt,
          skills:user.skills,
          intro:user.intro,
          social:user.social
        })
      )
    })
  })(req,res,next);
 
})

router.get('/facebook', passport.authenticate('facebook',{
  authType: 'rerequest', scope: ['public_profile', 'email']
}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
);

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
  }
});
let mailOptions,link;

router.post('/signup', async(req,res) => {

  const {email,password,Nickname} = req.body;

  const validate = 
    await User.findOne({
      where:{
        [Op.or] :[
          {
            email,
            verify:true
          },{
            verify:true,
            nick:Nickname,
          }
        ]
      }})
  if(!validate) {
    let key_one=crypto.randomBytes(256).toString('hex').substr(100, 5);
    let key_two=crypto.randomBytes(256).toString('base64').substr(50, 5);
    let key_for_verify=key_one+key_two;
  
    host = req.get('host');
    link = "http://"+req.get('host')+"/auth/verify?id="+key_for_verify;
  
    mailOptions={
      to : email,
      subject : "su_blog 회원 가입 인증메일",
      html : 
      "<div><h1>su_blog회원 가입요청에 감사드립니다.</h1><br><h3>가입을 원하신다면 아래 동의함을 클릭해주세요!</h3> <br><a style='color:white; font-weight:900; text-decoration: none;' href="+link+"><div style='background-color:rgb(13,72,50); padding:15px; border-radius:7px;height:25px;width:20%;text-align:center;font-size:2em'> 동의함</div></div></a>"
    }
  
    console.log(mailOptions);
  
    smtpTransport.sendMail(mailOptions, async (error, response) => {
      if(error){
        console.log(error);
        res.send("error");
      }else{
        const hash = await bcrypt.hash(password, 12);
        const user = await User.findOne({where : {email}})
        console.log(key_for_verify);
        if(!user) {
          await User.create({
            email,
            password: hash,
            nick:Nickname,
            verify:false,
            key_verify:key_for_verify,
          })
        } else {
          User.update({
            password: hash,
            nick:Nickname,
            key_verify:key_for_verify,
          },{
            where: {email}
          })
        }
        console.log("Message sent: " + response.message);
        res.end("sent");
         }
      });
  }else if(validate.dataValues.email === email) {
    res.json({massage:'이미 존재하는 이메일주소입니다.'})
  } else if(validate.dataValues.nick === Nickname) {
    res.json({massage:'이미 존재하는 닉네임입니다.'})
  }
});

router.get('/verify',async(req,res) => {
  console.log(req.query.id);
  await User.update({verify:true},{where:{key_verify:req.query.id}})
  res.send('<script>alert("인증이 완료되었습니다. 로그인 해 주세요!");</script>')
})





// router.post('/signup', async(req,res,next) => {
//   const {email,password,Nickname} = req.body;
//   const hash = await bcrypt.hash(password, 12);
//   await User.create({
//     email,
//     password: hash,
//     nick:Nickname,
//   })
//   return res.redirect('/');
// })

router.get('/logout', (req,res) => {
  req.logout();
  req.session.destroy();
  res.send('logout');
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profiles/')
  },
  filename(req, file, cb) {
  const ext = path.extname(file.originalname);  
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext); 
  },
  limits: { fileSize: 5 * 1024 * 1024 },
})

let upload = multer({ storage })

router.post('/profile/img/:nick',upload.single('img'), (req, res) => {
  console.log(req,'asd');
  const {formdata} = req.body
  const nick = req.params.nick;
  if(formdata) {
    User.update({profile_img:formdata},{where:{nick}})
    res.json({ path: formdata });
  }else if(req.file){
    User.update({profile_img:req.file.filename},{where:{nick}})
    res.json({ path: `${req.file.filename }` });
  }else {
    res.status("404").json("No file to Upload!")
  }
});

router.post('/profile/save', async(req,res) => {
  const {phone, img_path,id} = req.body;
  User.update({profile_img: img_path},{where: {email: id}})
  res.send(img_path);
})

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('http://localhost:3000/home');
});
module.exports = router;