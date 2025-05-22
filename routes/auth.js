import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import middlewar from '../middleware/middlewar.js';

const router = express.Router()

router.post('/signup', async (req,res)=>{
    try{
        const {name,email,password}= req.body;
        const user = await User.findOne({email}) 
        if (user) {
            return res.status(401).json({success: false,message:"User already exist"})
        }

        const oldPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: oldPassword
        })

        await newUser.save()

        return res.status(200).json({success: true, message:"Account Created Sucessfully"})
    }catch(error){
        return res.status(500).json({success: false, message:"Something gone Wrong"})


    }

});

router.post('/login', async (req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email}) 
        if (!user) {
            return res.status(400).json({success: false,message:"User Not exist"})
        }

           const checkpassword= await bcrypt.compare(password,user.password)
           if (!checkpassword) {
            return res.status(400).json({success: false,message:"Wrong password"})            
           }

           const token =jwt.sign({id: user._id},"qwertyuioplkjhgfdsa",{expiresIn:"5h"})

        return res.status(200).json({success: true,token, user:{name: user.name}, message:"Login Successfully"})
    }catch(error){
        return res.status(500).json({success: false, message:"check your connection"})


    }

});

router.get('/verify',middlewar,async(req, res)=>{
    return res.status(200).json({success: true, user:req.user})
})

export default router