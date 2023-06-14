import React, { useState, useEffect } from "react";

import CreateBook from "./components/CreateBook";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  const headers = [
    { name: "Title", key: "title" },
    { name: "Author", key: "author" },
    { name: "Year Read", key: "yearRead" },
    { name: "Rating", key: "rating" },
    { name: "Delete", key: "delete" },
  ];

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/books"
      );
      const responseData = await response.json();
      setBooks(responseData);
    };
    sendRequest();
  }, [setBooks]);

  const handleCreateBook = async ({ title, author, yearRead, rating }) => {
    let newBook = {
      title: title,
      author: author,
      yearRead: yearRead,
      rating: rating,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      newBook._id = responseData._id;
      setBooks([...books, newBook]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(process.env.REACT_APP_BACKEND_URL + `/books/${id}`, {
        method: "DELETE",
      });
      setBooks(books.filter((book) => {
        return book._id !== id;
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Harry's Books</h1>
      <CreateBook handleCreateBook={handleCreateBook} />
      <hr />
      <BookList books={books} headers={headers} deleteBook={deleteBook} />
    </div>
  );
}

export default App;
