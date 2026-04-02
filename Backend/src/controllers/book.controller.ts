import { Book } from "../model/book.model";

// add book
export const addBook = async (req: any, res: any) => {
  const book = await Book.create(req.body);
  res.json(book);
};

// delete
export const deleteBook = async (req: any, res: any) => {
  const ownerId = req.user.id;
  const bookId = req.params.id;

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.libraryId !== ownerId) {
    return res.status(403).json({
      message: "Not authorized to delete this book"
    });
  }

  await book.deleteOne();

  res.json({ message: "Book deleted" });
};

// search
export const searchBooks = async (req: any, res: any) => {
  const { author, title } = req.query;

  const books = await Book.find({
    ...(author && { author }),
    ...(title && { title })
  });

  res.json(books);
};

// student request
export const requestBookIssue = async (req: any, res: any) => {
  const { title, libraryId } = req.body;

  const book = await Book.findOneAndUpdate(
    { title, libraryId, status: "AVAILABLE" },
    {
      status: "REQUESTED",
      requestedBy: req.user.id
    },
    { new: true }
  );

  if (!book) return res.status(400).json({ message: "No copy available" });

  res.json(book);
};

// owner approve
export const approveBookIssue = async (req: any, res: any) => {
  const book = await Book.findById(req.params.bookId);

  if (!book || book.status !== "REQUESTED") {
    return res.status(400).json({ message: "Invalid" });
  }

  if (book.libraryId !== req.user.id) {
  return res.status(403).json({ message: "Not authorized" });
  }

  book.status = "ISSUED";
  book.issuedTo = book.requestedBy;
  book.issueDate = new Date();
  book.requestedBy = undefined;

  await book.save();

  res.json(book);
};

// return
export const returnBook = async (req: any, res: any) => {
  const book = await Book.findById(req.params.bookId);

  if (!book || book.status !== "ISSUED" || !book.issueDate) {
    return res.status(400).json({ message: "Invalid return" });
  }

  const days = Math.ceil(
    (Date.now() - book.issueDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const fine = days * 5;

  book.status = "AVAILABLE";
  book.issuedTo = undefined;
  book.issueDate = undefined;

  await book.save();

  res.json({ fine });
};

// get search by owner 
export const getOwnerBooks = async (req: any, res: any) => {
  const ownerId = req.user.id;

  const books = await Book.find({
    libraryId: ownerId
  });

  res.json(books);
};

export const getIssuedBooks = async (req: any, res: any) => {
  const studentId = req.user.id;

  const books = await Book.find({
    issuedTo: studentId,
    status: "ISSUED"
  });

  const updated = books.map((b) => {
    const days = Math.floor(
      (Date.now() - new Date(b.issueDate as Date).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return {
      ...b.toObject(),
      currentFee: days * 5
    };
  });

  res.json(updated);
};