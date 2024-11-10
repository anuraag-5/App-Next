import mongoose from "mongoose";

export default async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected successfully")
        })
        connection.off('error',(err)=>{
            console.log("Something went wrong")
            console.log(err);
        })
    } catch(error){
        console.log("Something went wrong");
        console.log(error);
    }
}