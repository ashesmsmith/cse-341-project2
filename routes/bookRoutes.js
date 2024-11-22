const router = require('express').Router();
const bookController = require('../controllers/bookControllers');
const utilities = require('../utilities/index');
const bookValidate = require('../utilities/validation');

/* ***************
 * Display Book(s)
 *************** */
// http://localhost:8080/books
router.get('/', 
  utilities.handleErrors(bookController.getAllBooks));

// http://localhost:8080/books/:id
router.get('/:id', 
  utilities.handleErrors(bookController.getBookById));

/* ***************
 * Create Book
 *************** */
router.post('/',
  bookValidate.bookRules(),
  bookValidate.bookValidation,
  utilities.handleErrors(bookController.createBook)
);

/* ***************
 * Update Book
 *************** */
router.put('/:id',
  bookValidate.bookRules(),
  bookValidate.bookValidation,
  utilities.handleErrors(bookController.updateBook)
);

/* ***************
 * Delete Book
 *************** */
router.delete('/:id', 
  utilities.handleErrors(bookController.deleteBook));

module.exports = router;
