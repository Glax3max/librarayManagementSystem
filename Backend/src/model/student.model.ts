import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: {type:String,required:true},
  password: {type:String,required:true},

    role: {
    type: String,
    default: "STUDENT"
  }
});

export const Student = mongoose.model("Student", studentSchema);