const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/iDrom",{
    useNewUrlParser: true
})

const UserSchema =new mongoose.Schema({
    fullname:{type:String},
    username:{type:String,unique:true},
    password:{type:String,set(val){
        return require("bcryptjs").hashSync(String(val).toString(),10)
    }},
    age:{type:Number},
    gender:{type: String},
    email:{type:String},
    phone:{type:String},
    country:{type:String},
    pet:{type:String},
    special:{type:String},
    role:{type:String,default:"user"},
    living:{type:String}
    
})


const User = mongoose.model("User",UserSchema)

const RoomSchema = new mongoose.Schema({
    buildingId:{type:String},
    number:{type:String},
    floor:{type:Number},
    peopleMax:{type:Number},
    peopleLive:{type:Number},
    type:{type:String},
    price:{type:Number}

})

const Room = mongoose.model("Room",RoomSchema)


const Building = mongoose.model("Building",new mongoose.Schema({
    buildingName:{type:String,unique:true},
    address:{type:String}
}))


const RoomRecommend = mongoose.model("RoomRecommend",new mongoose.Schema({
    personId:{type:String},
    roomId:{type:String}
}))


//User.db.dropCollection("users")
module.exports = { User , Room,Building,RoomRecommend } 