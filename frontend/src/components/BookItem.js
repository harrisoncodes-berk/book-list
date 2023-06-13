import React from "react";

import "./BookItem.css";

function BookItem({ book }) {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <h4>by {book.author}</h4>
      <p>{book.yearRead}</p>
      <p>{book.rating}</p>
      <button>Delete Book</button>
    </div>
  );
}

export default BookItem;
