import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  libraryId: { type: String, required: true },

  status: {
    type: String,
    enum: ["AVAILABLE", "REQUESTED", "ISSUED"],
    default: "AVAILABLE"
  },

  requestedBy: String, // studentId
  issuedTo: String,
  issueDate: Date
});

export const Book = mongoose.model("Book", bookSchema);