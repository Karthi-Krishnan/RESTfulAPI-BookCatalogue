//mongoose
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//create Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

//create Collection
const Book = mongoose.model("Book",bookSchema);

//return db model object
module.exports = Book;