//express
const express = require("express");
const Book = require("../models/book");
const router = express.Router();

//Book: db model object
const bookModel = require("../models/book");

//GET Route
router.get('/', async (req,res) => {
    try{
        const books = await Book.find();
        res.json(books);
    } catch (err){
        res.send(err);
    }
    
});

//POST Route
router.post('/', async (req,res) => {
    const newBook = new bookModel({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating
    });
   
    try {
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (err) {
        res.send(err);
    }    
});

//DELETE Route
router.delete('/', async (req,res) => {
    try {
        const allBooksDeleted = await bookModel.deleteMany();
        res.send("All Books Deleted.");
    } catch (err) {
        res.send(err);
    }
});

//GET SPECIFIC Route
router.get('/:bookTitle', async (req,res) => {
    try {
        const bookFound = await bookModel.findOne({title: req.params.bookTitle});
        res.json(bookFound);
    } catch (err) {
        res.send(err);
    }   
});

//DELETE SPECIFIC Route
router.delete('/:bookTitle', async (req,res) => {
    try {
        const bookDeleted = await bookModel.deleteOne({title: req.params.bookTitle});
        res.json(bookDeleted);
    } catch (err) {
        res.send(err);
    }
});

//PUT Route: Updates all fields
router.put('/:bookTitle', async (req,res) => {
    try {
        const updatedBook = await bookModel.findOneAndUpdate(
            {title: req.params.bookTitle},
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                rating: req.body.rating
            },
            {
                overwrite: true,
                new: true
            }
        );
        res.json(updatedBook);
    } catch (err) {
        res.send(err);
    }
});

//PATCH Route: Update specific field
router.patch('/:bookTitle', async (req,res) => {
    try{
        const updatedBook = await bookModel.findOneAndUpdate(
            {title: req.params.bookTitle},
            {$set: req.body},
            {
                overwrite: true,
                new:true
            }
        );
        res.json(updatedBook);
    } catch (err) {
        res.send(err);
    }
});

//export router
module.exports = router;
