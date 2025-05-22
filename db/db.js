import mongoose from "mongoose";


const connectToMongoDB =async ()=>{
    try{

        await mongoose.connect("mongodb+srv://Dinesh:qwertyuioplkjhgfdsa@cluster0.mnxslcl.mongodb.net/note_app");
        console.log("connect to mongoDB");
    
    }catch(error){
        console.log("Error connect to mongoDb", error.message);
        

    }
};
export default connectToMongoDB;