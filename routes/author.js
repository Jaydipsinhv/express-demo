const express = require('express');

// we are using the Router method to handle the author routes individually
const router = express.Router();

// sample data, normally we get the data from database with real meaningful data
const authors = [{
  id: '1',
  name: 'Jaydipsinh Vaghela',
  designation: 'Freelancer',
}, {
  id: '2',
  name: 'Random Author Name',
  designation: 'Employee',
}];

// API endpoint to get all the authors
router.get('/', (req, res) => res.status(200).json(authors));

// API endpoint to get author based on author id
router.get('/:authorId', (req, res) => {
  const book = authors.find((a) => a.id === req.params.authorId);
  if (!book) {
    return res.status(404).json({
      message: 'Author is not exist with provided information',
    });
  }
  return res.status(200).json(book || {});
});

module.exports = router;
