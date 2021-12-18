const express = require('express');
const router = express.Router();
const {auth,SECRET} = require('../middlewares/auth');
const {User,Room,Building,RoomRecommend} = require("../models/models.js")
const jwt = require("jsonwebtoken")
router.use(express.json())


router.get('/users',async(req,res)=>{
    const users =await User.find()
    console.log(users)
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
    const isPasswordValid = require("bcryptjs").compareSync(req.body.password,user.password)
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

router.get('/buildings',async(req,res)=>{
    res.send(await Building.find())
})

router.get('/rooms',async(req,res)=>{
    var buildingId = req.query.buildingId
    console.log(req.query.buildingId)
    res.send(await Room.find({
        buildingId:buildingId
    }))
})

//这个路由有问题,待重写
router.get('/room',async(req,res)=>{
    var roomId = req.query.roomId
    res.send(await User.find({
        
    }))
})

router.get('/rooms/want',auth,async(req,res)=>{
    res.send(await RoomRecommend.find({
        personId:req.query.personId
    }))
})

router.get('/rooms/recommend',auth,async(req,res)=>{
    
})




module.exports = router