// Import MySQL connection.
const connection = require("../config/connection.js");

// ORM class for all our SQL statement functions.
class ORM {
  constructor(connection){
    this.connection = connection;
  }

  // Helper function for SQL syntax.
  // Let's say we want to pass 3 values into the mySQL query.
  // In order to write the query, we need 3 question marks.
  // This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
  // ["?", "?", "?"].join(', ') => "?, ?, ?";
  printQuestionMarks(numberOfValuesOrColumns, type){
    const questionMarks = [];
    for (var i = 0; i < numberOfValuesOrColumns; i++) {
      if(type === 'cols'){
        questionMarks.push("??");
      } else {
        questionMarks.push("?")
      }
    }
    return questionMarks.join(', ');
  }

  // create innerJoin function
  innerJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
    // 'SELECT firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorsId'
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length, 'cols')} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;
    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
  }

  innerJoinWhere(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol, whereColumn, whereValue) {
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length, 'cols')} FROM ?? INNER JOIN ?? ON ??.?? = ??.?? WHERE ?? = ?`;
    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol, whereColumn, whereValue])
  }

  create(table, values) {
    const queryString = `INSERT INTO ?? SET ?`;

    return this.connection.query(queryString, [table, values])
  }

  // create deleteWhere function
  deleteFrom(table, column, value){
      const queryString = `DELETE FROM ?? WHERE ?? = ?`;

      return this.connection.query(queryString, [table, column, value]);
  }


};

var orm = new ORM();


// Export the orm object for the model (cat.js).
module.exports = new ORM(connection);