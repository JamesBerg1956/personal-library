const orm = require ("../config/orm.js");

class Note{

    getBookNotes(bookTitle){
        //innerJoinWhere(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol, whereColumn, whereValue)
        return orm.innerJoinWhere(['notes.id','note'], 'notes', 'books', 'bookId', 'id', 'title', bookTitle);
    }

    addBookNote(note, bookId){
        return orm.create("notes", {
            note:note,
            bookId:bookId
          })
    }

    deleteNote(noteId){
        return orm.deleteFrom("notes", "id", noteId);
        
        // return this.connection.query('DELETE FROM notes WHERE id=?', 
        //   [noteId])
    }

}

module.exports = new Note();