const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//require('./routes/apiRoutes')(app);
//require('./routes/htmlRoutes')(app);
const bookRoutes = require("./controllers/booksController.js");
const noteRoutes = require("./controllers/notesController.js");
const htmlRoutes = require("./controllers/htmlController.js");
app.use(bookRoutes);
app.use(noteRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
});