const router = require('express').Router();
const libraryController = require('../controllers/libraryControllers');
const libraryValidate = require('../utilities/validation');

/* ***************
 * Display Library
 *************** */
// http://localhost:8080/library
router.get('/', libraryController.getLibrary);

// http://localhost:8080/library/:id
router.get('/:id', libraryController.getBookById);

/* ***************
 * Add Book to Library
 *************** */
router.post('/', 
    libraryValidate.libraryRules(),
    libraryValidate.validation,
    libraryController.addBook);

/* ***************
 * Update Book in Library
 *************** */
router.put('/:id', 
    libraryValidate.libraryRules(),
    libraryValidate.validation,
    libraryController.updateBook);

/* ***************
 * Delete Book from Library
 *************** */
router.delete('/:id', libraryController.deleteBook);

module.exports = router;
