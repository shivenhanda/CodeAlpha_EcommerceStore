import express from 'express'
import path from 'path'
import bcrypt from 'bcrypt'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { NewUser, WishListData, CartListData } from './Model.js'
import { log } from 'console'

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
        console.log("working");
        req.user=decoded;
    }}catch(error){
        console.log("check cookies")
        req.user=null
    }
    next()
}

app.get("/api/profile", async (req, res) => {
    if(req.user){
        console.log("verify user")
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
        req.user=user
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
        req.user=user
        return res.json({success:true,message:"Login Successfully",user:user})
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Login Not Completed" })
    }
})

app.get("/api/wishlistData", async (req, res) => {
    console.log("API Hit")
    try {
        const user = req.user?.user;
        console.log("user",user)
        if (!user) {
            return res.json({ success: false, message: "no user" });
        }
        const data = await WishListData.findOne({ user });
        const wishlist = data?.wishlist || [];
        return res.json({ success: true, wishlist:wishlist });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});

app.post("/api/wishlistData", async (req, res) => {
    try {
        const user = req.user?.user;
        if (!user) {
            return res.json({ success: false, message: "no user" });
        }
        const { wishlist } = req.body;
        const data = await WishListData.findOneAndUpdate(
            { user },
            { wishlist },
            { upsert: true }
        );
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});
app.get("/api/cartData", async (req, res) => {
    try {
        const user = req.user?.user;
        if (!user) {
            return res.json({ success: false, message: "no user" });
        }
        const data = await CartListData.findOne({ user });
        const cartlist = data?.cartlist || [];
        return res.json({ success: true, cartlist:cartlist });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});

app.post("/api/cartData", async (req, res) => {
    try {
        const user = req.user?.user;
        console.log("cart user",user)
        if (!user) {
            return res.json({ success: false, message: "no user" });
        }
        const { cartlist } = req.body;
        const data = await CartListData.findOneAndUpdate(
            { user },
            { cartlist }
        );
        return res.json({ success: true ,message:data});
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(process.cwd(), "..", "frontend", "dist", "index.html"));
});

app.listen(port, () => {
    console.log("Available on localhost", port)
})