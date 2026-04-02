import { Library } from "../model/library.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../common/utils/jwt";

// register library
export const createLibrary = async (req: any, res: any) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const lib = await Library.create({
    ...req.body,
    password: hashed
  });

  const token = generateToken({
    id: lib._id,
    role: lib.role
  });

  res.json({ lib, token });
};

// login
export const loginLibrary = async (req: any, res: any) => {
  const lib = await Library.findOne({ email: req.body.email });

  if (!lib) return res.status(400).json({ message: "Not found" });

  const isMatch = await bcrypt.compare(req.body.password, lib.password);

  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = generateToken({
    id: lib._id,
    role: lib.role
  });

  res.json({ lib, token });
};

// accept student
export const registerStudentToLibrary = async (req: any, res: any) => {
  const { libraryId, studentId } = req.body;

  const lib = await Library.findByIdAndUpdate(
    libraryId,
    { $addToSet: { students: studentId } },
    { new: true }
  );

  res.json(lib);
};