const express = require('express');
const bookRouter = express.Router();

const book = require("../models/book.js");

bookRouter.get("/api/books", (req, res) => {
    book.getAllBooks()
    .then(function(results){
        res.json(results)
      })
    .catch(error => res.json(error))
});

bookRouter.get('/api/book/:name', (req, res) => {
    const title = req.params.name;
    book.getOneBook(title)
    .then(results => res.json(results))
    .catch(error => res.json(error))
});

bookRouter.post('/api/book/new', (req, res) => {
    const { title, coverPhoto, authorId } = req.body;
    book.addBook(title, coverPhoto, authorId)
    .then(() => res.status(200).json(true))
    .catch(error => res.status(500).json(error))
});

module.exports = bookRouter;