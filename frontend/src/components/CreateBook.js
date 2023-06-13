import React, { useState } from "react";

import "./CreateBook.css";

function CreateBook({ handleCreateBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateBook({
      title: title,
      author: author,
      yearRead: year,
      rating: rating,
    });
    setTitle("");
    setAuthor("");
    setYear("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={handleTitleChange} />
      <label>Author:</label>
      <input type="text" value={author} onChange={handleAuthorChange} />
      <label>Year Read:</label>
      <input type="text" value={year} onChange={handleYearChange} />
      <label>Rating:</label>
      <input type="text" value={rating} onChange={handleRatingChange} />
      <button>Create Book</button>
    </form>
  );
}

export default CreateBook;
