const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const {User} = require("./models.js")
const jwt = require("jsonwebtoken")


const SECRET = "qwernodgsfgb"

const app = express()
app.use(express.json())

app.get('/',async(req,res)=>{
    console.log("/")
    res.send("OK")
}) 

app.get('/api/users',async(req,res)=>{
    const users =await User.find()
    res.send(users)
}) 


app.post('/api/register',async(req,res)=>{
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
}) 


app.post('/api/login',async(req,res)=>{
    const user = await User.findOne({
        username:req.body.username
    })
    if(!user){
        return res.status(422).send({
           message:"Username does not exist" 
        })
    }
    const isPasswordValid = require("bcrypt").compareSync(req.body.password,user.password)
    if(!isPasswordValid){
        return res.status(422).send({
            message:"Wrong password" 
         })
    }

    //token 
    
    const token = jwt.sign({
        id:String(user._id)
    },SECRET)

    res.send({
        username :user.username,
        token
    })
}) 

const auth = async(req,res,next)=>{
    const raw = String(req.headers.authorization).split(" ").pop()
    const {id} = jwt.verify(raw,SECRET)
    req.user = await User.findById(id)
    //TODO(错误处理)
    next()
}

app.get('/api/profile',auth,async(req,res)=>{

    res.send(user)
})

app.listen(3001,()=>{
    console.log("http://127.0.0.1:3001")
})