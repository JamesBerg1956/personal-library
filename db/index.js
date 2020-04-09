const connection = require('../config/connection');

class DB { 
  constructor(connection){
    this.connection = connection;
  }

  // TIP: use orm.selectAll()
  getAllBooks(){
    // returns a promise so that when it's called we can use .then() and .catch()
   return this.connection.query('SELECT firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorId')
  }

  // TIP: use orm.selectJoinWhere()
  getOneBook(bookTitle){
    return this.connection.query('SELECT books.id, firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorId WHERE books.title=?', [bookTitle])
  }

  // TIP: use orm.selectJoinWhere()
  getBookNotes(bookTitle){
   return this.connection.query('SELECT notes.id, note FROM notes INNER JOIN books ON books.id = notes.bookId WHERE books.title=?', [bookTitle])
  }

  // TIP: use orm.create
  addBook(title, coverPhoto, authorId){
   return this.connection.query('INSERT INTO books SET ?', 
     {
       title,
       authorId,
       coverPhoto
     })
  }

  // TIP: use orm.create("Some new note text", 3)
  addBookNote(note, bookId){
    return this.connection.query('INSERT INTO notes SET ?', 
     {
       note,
       bookId
     })
  }

  // TIP: use orm.deleteWhere()
  deleteNote(noteId){
   return this.connection.query('DELETE FROM notes WHERE id=?', 
     [noteId])
  }
}

module.exports = new DB(connection);