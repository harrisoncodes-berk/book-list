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
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/books"
      );
      const responseData = await response.json();
      setBooks(responseData);
    };
    sendRequest();
  }, [books]);

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
