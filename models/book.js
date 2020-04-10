const orm = require ("../config/orm.js");

class Book{
    
    getAllBooks(){
        return orm.innerJoin(['firstName', 'lastName', 'title', 'coverPhoto'], 'authors', 'books', 'id', 'authorId');
    }

    getOneBook(title){
        return orm.innerJoinWhere(['books.id','firstName', 'lastName', 'title', 'coverPhoto'], 'authors', 'books', 'id', 'authorId', "title", title);
    }

    addBook(title, coverPhoto, authorId){
        return orm.create("books", {title:title, coverPhoto:coverPhoto, authorId:authorId});
    }

}

module.exports = new Book();