import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MONGODB Connected successfully");
    }catch(err) {
        console.log("DB connections failed",err);
        process.exit(1);
    }
}