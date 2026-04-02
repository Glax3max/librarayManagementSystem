import express from "express";
import {
  addBook,
  deleteBook,
  searchBooks,
  requestBookIssue,
  approveBookIssue,
  returnBook,
  getOwnerBooks,
  getIssuedBooks
} from "../controllers/book.controller";
import { auth } from "../common/middlewares/auth.middleware";
import { authorize } from "../common/middlewares/role.middleware";

const router = express.Router();

router.post("/", auth, authorize("OWNER"), addBook);
router.delete("/:id", auth, authorize("OWNER"), deleteBook);

router.get("/search", auth, searchBooks);

router.post("/request", auth, authorize("STUDENT"), requestBookIssue);
router.get("/owner-books", auth, authorize("OWNER"), getOwnerBooks);
router.get("/issued", auth, authorize("STUDENT"), getIssuedBooks);
router.patch("/approve/:bookId", auth, authorize("OWNER"), approveBookIssue);
router.patch("/return/:bookId", auth, authorize("STUDENT"), returnBook);

export default router;