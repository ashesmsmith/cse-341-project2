const router = require('express').Router();
const bookController = require('../controllers/bookControllers');
const bookValidate = require('../utilities/validation');

/* ***************
 * Display Book(s)
 *************** */
// http://localhost:8080/books
router.get('/', bookController.getAllBooks);

// http://localhost:8080/books/:id
router.get('/:id', bookController.getBookById);

/* ***************
 * Create Book
 *************** */
router.post('/',
    bookValidate.bookRules(),
    bookValidate.validation,
    bookController.createBook);

/* ***************
 * Update Book
 *************** */
router.put('/:id',
    bookValidate.bookRules(),
    bookValidate.validation,
    bookController.updateBook);

/* ***************
 * Delete Book
 *************** */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
