import React from "react";

import BookItem from "./BookItem";

function BookList({ books }) {
  const renderedBooks = books.map((book) => {
    return <BookItem key={book._id} book={book} />;
  });
  return <div>{renderedBooks}</div>;
}

export default BookList;
