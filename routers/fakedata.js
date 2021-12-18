const express = require('express');
const router = express.Router();
const {auth,SECRET} = require('../middlewares/auth');
const {User,Room,Building,RoomRecommend} = require("../models/models.js")
const jwt = require("jsonwebtoken")
router.use(express.json())


Room.db.dropCollection("rooms")
//RoomRecommend.db.dropCollection("roomcommends")

User.db.dropCollection("users");
Building.db.dropCollection("buildings");
(async () =>{
        
        //创建一个管理员
        await User.create({
            username:"tianqi",
            password:"tianqi123",
            role:"admin"
        })
//三个宿舍
await Building.create({
"buildingName":"DormA",
"address":"2199 Beer Orchard Suite 867"
})
await Building.create({
"buildingName":"DormB",
"address":"2199 Beer Orchard Suite 867"
})
await Building.create({
"buildingName":"DormC",
"address":"2199 Beer Orchard Suite 867"
})

const b1 =await Building.findOne({
    "buildingName":"DormA"
})
const b2 =await Building.find({
    "buildingName":"DormB"
})

const b3 =await Building.find({
    "buildingName":"DormC"
})

await Room.create({
    buildingId:String(b1._id),
    number:"101",
    floor:1,
    peopleMax:2,
    peopleLive:0,
    type:"female",
    price:1234
})
await Room.create({
    buildingId:String(b1._id),
    number:"102",
    floor:1,
    peopleMax:2,
    peopleLive:0,
    type:"female",
    price:1234
})

await Room.create({
    buildingId:String(b1._id),
    number:"103",
    floor:1,
    peopleMax:2,
    peopleLive:0,
    type:"female",
    price:1234
})


})()