const express = require("express");

const booksController = require("../controllers/books-controller");

const router = express.Router();

router.post('/', booksController.createBook);

router.get('/', booksController.getBooks);

router.delete('/:bookId', booksController.deleteBook);

module.exports = router;