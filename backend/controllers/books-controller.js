const Book = require("../models/book");

const createBook = async (req, res, next) => {
  const { title, author, yearRead, rating } = req.body;

  const createdBook = new Book({ title, author, yearRead, rating });

  try {
    await createdBook.save();
  } catch (error) {
    return res.json({ message: "Create book failed" });
  }

  res.json(createdBook);
};

const getBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (error) {
    return res.json({ message: "Get books failed" });
  }

  res.json(books);
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (error) {
    return res.json({ message: "Book not found" });
  }

  try {
    await book.deleteOne();
  } catch (error) {
    return res.json({ message: "Delete book failed" });
  }

  res.json(bookId);
};

exports.getBooks = getBooks;
exports.createBook = createBook;
exports.deleteBook = deleteBook;
