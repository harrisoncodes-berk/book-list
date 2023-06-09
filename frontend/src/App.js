import React, { useState, useEffect } from "react";

import CreateBook from "./components/CreateBook";
import BookList from "./components/BookList";

// TO-DO:
// 1) Connect to backend - Done
// 2) Add filter
// 3) Add Search

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5001/api/books");
      const responseData = await response.json();
      setBooks(responseData);
    };
    sendRequest();
  }, []);

  const handleCreateBook = async ({ title, author, yearRead, rating }) => {
    try {
      const response = await fetch("http://localhost:5001/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          author: author,
          yearRead: yearRead,
          rating: rating,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Harry's Books</h1>
      <CreateBook handleCreateBook={handleCreateBook} />
      <hr />
      <BookList books={books} />
    </div>
  );
}

export default App;
