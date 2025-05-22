import jwt from 'jsonwebtoken'
import User from '../models/user.js'


const middlewar = async (req,res, next)=>{
    try {
        const token =  req.headers.confirmation.split(' ')[1];
        if (!token) {
            return res.status(401).json({success:false,message:"Unauthorozied"})           
        }
        const access = jwt.verify(token,"qwertyuioplkjhgfdsa")
        if (!access) {
            return res.status(401).json({success:false,message:"check Token"})
        }
        const user = await User.findById(access.id)
        if (!user) {
            return res.status(404).json({success:false,message:"user error"})          
        }

        const newUser = {name:user.name, id: user._id}
        req.user = newUser
        next()
        
    } catch (error) {
        return res.status(500).json({success:false,message:"login again and retry"})          
 
        
    }
};
export default middlewar