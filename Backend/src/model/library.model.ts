import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  name: String,
  ownerName: String,
  email: {type:String,required:true},
  password: {type:String,required:true},
  location: String,
   role: {
    type: String,
    default: "OWNER"
  },
  students: [String] 
});

export const Library = mongoose.model("Library", librarySchema);