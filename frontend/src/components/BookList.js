import React, { useState } from "react";
import { GoArrowSmallDown, GoArrowSmallUp } from "react-icons/go";

import "./BookList.css";

function BookList({ books, headers }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSortClick = (column) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortOrder("ascending");
      return;
    }

    if (sortOrder === "ascending") {
      setSortOrder("descending");
    } else if (sortOrder === "descending") {
      setSortOrder(null);
      setSortColumn(null);
    } else {
      setSortOrder("ascending");
    }
  };

  let sortedBooks = books;
  if (sortOrder && sortColumn) {
    sortedBooks = [...books].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      const reverseOrder = sortOrder === "ascending" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  const renderedHeaders = headers.map((header) => {
    return (
      <th key={header.key} onClick={() => handleSortClick(header.key)}>
        <div className="header">
          {getIcons(header.key, sortColumn, sortOrder)}
          {header.name}
        </div>
      </th>
    );
  });

  const renderedBooks = sortedBooks.map((book) => {
    return (
      <tr key={book._id}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.yearRead}</td>
        <td>{book.rating}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedBooks}</tbody>
    </table>
  );
}

function getIcons(column, sortColumn, sortOrder) {
  if (column !== sortColumn || sortOrder === null) {
    return (
      <div className="arrows">
        <GoArrowSmallUp />
        <GoArrowSmallDown />
      </div>
    );
  }

  if (sortOrder === "ascending") {
    return (
      <div>
        <GoArrowSmallUp />
      </div>
    );
  } else if (sortOrder === "descending") {
    return (
      <div>
        <GoArrowSmallDown />
      </div>
    );
  }
}

export default BookList;
