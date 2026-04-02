import express from "express";
import bookRoutes from "./routes/book.routes";
import libraryRoutes from "./routes/library.routes";
import studentRoutes from "./routes/student.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/students", studentRoutes);

export default app;