const express = require('express');

// we are using the Router method to handle the author routes individually
const router = express.Router();
// sample data, normally we get the data from database with real meaningful data
const books = [{
  id: '1',
  name: 'Book 1',
  authorName: 'Random Author Name',
}, {
  id: '2',
  name: 'Book 2',
  authorName: 'Jaydipsinh Vaghela',
}];

// get all the books with details
router.get('/', (req, res) => res.status(200).json(books));

// get author name based on book id, we are using the params feature of router
router.get('/:bookId/author', (req, res) => {
  const book = books.find((b) => b.id === req.params.bookId);
  if (!book) {
    return res.status(404).json({
      message: 'Book not exists with provided information',
    });
  }
  return res.status(200).json(book ? book.authorName : '');
});

module.exports = router;
