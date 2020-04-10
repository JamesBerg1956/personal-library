const express = require('express');
const noteRouter = express.Router();

const bookNote = require("../models/note.js");

noteRouter.get('/api/book/notes/:name', (req, res) => {
    const bookName = req.params.name;

    bookNote.getBookNotes(bookName)
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
});

noteRouter.post('/api/book/note', (req, res) => {
    const { note, bookId } = req.body;

    bookNote.addBookNote(note, bookId)
    .then(() => res.status(200).json(true))
    .catch(error => res.status(500).json(error))
});

noteRouter.delete('/api/note/:id', (req, res) => {
    bookNote.deleteNote(req.params.id)
    .then(() => res.status(200).json(true))
    .catch(error => res.status(500).json(error))
  });

module.exports = noteRouter;