const express = require('express');
const htmlRouter = express.Router();
const path = require('path');

htmlRouter.get('/library', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/library.html'))
});

htmlRouter.get('/bookDetail/:title', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/bookDetail.html'))
});

htmlRouter.get('/addBook', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/addBook.html'))
});

htmlRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = htmlRouter;