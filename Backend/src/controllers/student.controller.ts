import { Student } from "../model/student.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../common/utils/jwt";

export const register = async (req: any, res: any) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const student = await Student.create({
    ...req.body,
    password: hashed
  });

  const token = generateToken({
    id: student._id,
    role: student.role
  });

  res.json({ student, token });
};

export const login = async (req: any, res: any) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student) return res.status(400).json({ message: "Not found" });

  const isMatch = await bcrypt.compare(req.body.password, student.password);

  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = generateToken({
    id: student._id,
    role: student.role
  });

  res.json({ student, token });
};