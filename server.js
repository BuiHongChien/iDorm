const express = require('express')
const api = require("./routers/api")
const fakeData = require("./routers/fakedata")



const app = express()
app.use(express.json())

app.get('/',async(req,res)=>{
    console.log("/")
    res.send("OK")
}) 

app.use("/api",api)





app.listen(3001,()=>{
    console.log("http://127.0.0.1:3001")
})