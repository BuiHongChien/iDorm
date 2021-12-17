const express = require('express');
const router = express.Router();
const {auth,SECRET} = require('../middlewares/auth');
const {User} = require("../models/models.js")
const jwt = require("jsonwebtoken")
router.use(express.json())



router.get('/users',async(req,res)=>{
    const users =await User.find()
    res.send(users)
}) 


router.post('/register',async(req,res)=>{
    await User.create(
        {
            fullname : req.body.fullname,
            username:req.body.username,
            password:req.body.password,
            age:req.body.age,
            gender:req.body.gender,
            email:req.body.email,
            phone:req.body.phone,
            country:req.body.country,
            pet:req.body.pet,
            special:req.body.special
        }
    )
    res.send({
        username:req.body.username
    })
}) 


router.post('/login',async(req,res)=>{
    
    const user = await User.findOne({
        username:req.body.username
    })
    if(!user){
        return res.sendStatus(422)
    }
    console.log("you user")
    const isPasswordValid = require("bcrypt").compareSync(req.body.password,user.password)
    if(!isPasswordValid){
        return res.sendStatus(422)
    }

    //token 
    const token = jwt.sign({id:String(user._id)},SECRET)
    res.send({
        userId:user._id,
        role:user.role,
        token:token
    })
}) 



router.get('/profile',auth,async(req,res)=>{
    res.send(req.user)
})




module.exports = router