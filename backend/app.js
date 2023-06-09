const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const booksRoutes = require("./routes/books-routes");

// TO-DO:
// 1) add, get, update, delete
// 2) Verify input is correct

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  
  next();
});

app.use("/api/books", booksRoutes);

mongoose
  .connect(
    "mongodb+srv://test-user-1:eF6N29K0o7mkUkd9@cluster0.atqwvze.mongodb.net/books?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
