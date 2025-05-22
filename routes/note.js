import express from 'express'
import Note from '../models/Note.js'
import middlewar from '../middleware/middlewar.js';

const router =express.Router()

router.post('/add',middlewar,async(req,res)=>{
    try{
        const {title, description}= req.body;
 
         
        const newNote = new Note({
            title,
            description,
            userId:req.user.id
            
        });

        await newNote.save()

        return res.status(200).json({success: true, message:"Note Added Sucessfully"})
    }catch(error){
        return res.status(500).json({success: false, message:"error in adding Note"})


    }

})

router.get('/',middlewar,async(req,res)=>{
    try {
        const notes =await Note.find({userId: req.user.id})
        return res.status(200).json({success:true,notes})
        
    } catch (error) {
        return res.status(500).json({success:false,message:"error from your meessage"})        
    }
})

router.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const updateNote = await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success:true,updateNote})
        
    } catch (error) {
        return res.status(500).json({success:false,message:"cannot update notes"})        
    }
})

router.delete("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const updateNote = await Note.findByIdAndDelete(id)
        return res.status(200).json({success:true,updateNote})
        
    } catch (error) {
        return res.status(500).json({success:false,message:"can't Delete notes"})        
    }
})

export default router;