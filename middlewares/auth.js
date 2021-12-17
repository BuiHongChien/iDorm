const jwt = require("jsonwebtoken")
const {User} = require("../models/models.js")
const SECRET = "qwernodgsfgb"

const auth = async(req,res,next)=>{
    const raw = String(req.headers.authorization).split(" ").pop()
    const {id} = jwt.verify(raw,SECRET)
    req.user = await User.findById(id)
    //TODO(错误处理)
    next()
}
module.exports={auth,SECRET};