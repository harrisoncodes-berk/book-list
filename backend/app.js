const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const process = require("./nodemon.json");

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.atqwvze.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const booksRoutes = require("./routes/books-routes");

// TO-DO:
// 1) add, get, update, delete - DONE
// 2) Verify input is correct

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/books", booksRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
