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
  printQuestionMarks(numberOfValues){
    const questionMarks = [];

    for (var i = 0; i < numberOfValues; i++) {
      questionMarks.push("?");
    }

    return questionMarks.join(', ');
  }

  selectAll(table) {
    const queryString = 'SELECT * FROM  ??';
    return this.connection.query(queryString, [table])
  }

  // create innerJoin function
  innerJoin(table, columns, joinTable, tableId, joinTableId){
    const queryString = `SELECT ${columns.join(', ')} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;

    return this.connection.query(queryString, table, joinTable, table,tableId, joinTable, joinTableId);
  }

  // TODO: create selectJoinWhere

  create(table, columns, values) {
    
    const queryString = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${this.printQuestionMarks(values.length)})`;

    console.log(queryString);

    return this.connection.query(queryString, [table, ...values])
  }

  // An example of objColVals would be {name: panther, hungry: true}
  update(table, objColVals, id) {
    var queryString = `UPDATE ?? SET ? WHERE ?`;

    console.log(queryString);

    return this.connection.query(queryString, [table, objColVals, id])
  }

  // TODO: create deleteWhere function

};

var orm = new ORM();


// Export the orm object for the model (cat.js).
module.exports = new ORM(connection);