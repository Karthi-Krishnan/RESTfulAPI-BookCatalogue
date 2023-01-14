//express
const express = require("express");
const app = express();

//body-parser
const bodyParser = require("body-parser");

//mongoose
const mongoose = require('mongoose');

//Create Database Connection
mongoose.set('strictQuery', true);
 mongoose.connect("mongodb://127.0.0.1:27017/booksDB",{useNewUrlParser: true},() => {
  console.log("Database is Connected!");
 });

//express server
app.listen(3000,() => {
  console.log("Server has started!");
})

//body-parser middleware
app.use(bodyParser.json());

//routes: Router object
const booksRoute = require("./routes/books");
app.use("/books",booksRoute);
