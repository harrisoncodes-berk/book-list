import React from "react";

import "./BookList.css";
import BookItem from "./BookItem";

function BookList({ books }) {
  const renderedBooks = books.map((book) => {
    return <BookItem key={book._id} book={book} />;
  });
  return <div className="book-list">{renderedBooks}</div>;
}

export default BookList;
