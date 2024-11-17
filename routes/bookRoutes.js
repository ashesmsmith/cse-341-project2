const router = require('express').Router();
const bookController = require('../controllers/bookControllers');

// Display Book(s)
router.get('/', bookController.getAllBooks); // http://localhost:8080/books
router.get('/:id', bookController.getBookById); // http://localhost:8080/books/:id

// Create Book
router.post('/', bookController.createBook);

// Update Book
router.put('/:id', bookController.updateBook);

// Delete Book
router.delete('/:id', bookController.deleteBook);

module.exports = router;