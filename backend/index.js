import express from 'express'
import path from 'path'
import bcrypt from 'bcrypt'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import NewUser from './Model.js'

const app = express()
const port = 8000

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), "..", "frontend", "dist")))
app.use(checkcookie)

function checkcookie(req,res,next){
    try{if(req.cookies.token){
        let decoded=jwt.verify(req.cookies.token,"secret")
        req.user=decoded;
    }}catch(error){
        req.user=null
    }
    next()
}

app.get("/api/profile", async (req, res) => {
    if(req.user){
        return res.json({success:true,user:req.user})
    }
    return res.json({success:false,user:null})
})

app.post("/api/SignUp", async (req, res) => {
    const { user, email, password } = req.body
    let existingUser = await NewUser.findOne({
        $or: [{ user }, { email }]
    })
    if (existingUser) {
        return res.json({ success: false, message: "Something is wrong" })
    }
    try {
        let salt = await bcrypt.genSalt(10)
        let hashpassword = await bcrypt.hash(password, salt)
        await NewUser.create({
            user,
            email,
            password: hashpassword
        })
        let token = jwt.sign({ user }, "secret")
        res.cookie("token", token, {
            httpOnly: true
        })
        return res.json({ success: true, message: "Signup Successfully",user:user })
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Signup Not Completed" })
    }
})
app.post("/api/Login", async (req, res) => {
    const { user, password } = req.body
    let existingUser = await NewUser.findOne({ user })
    if (!existingUser) {
        return res.json({ success: false, message: "Something is wrong" })
    }
    try {
        let match=await bcrypt.compare(password,existingUser.password)
        if(!match){
            return res.json({ success: false, message: "Something is wrong" })
        }
        let token=jwt.sign({user},"secret")
        res.cookie("token",token,{
            httpOnly:true
        })
        return res.json({success:true,message:"Login Successfully",user:user})
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Login Not Completed" })
    }
})
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(process.cwd(), "..", "frontend", "dist", "index.html"));
});

app.listen(port, () => {
    console.log("Available on localhost", port)
})