const router = require('express').Router();
const libraryController = require('../controllers/libraryControllers');
const isAuthenticated = require('../middleware/authenticate');

/* ***************
 * Display Library
 *************** */
// http://localhost:8080/library
router.get('/', isAuthenticated, libraryController.getLibrary);

// http://localhost:8080/library/:id
router.get('/:id', isAuthenticated, libraryController.getBookById);

/* ***************
 * Add Book to Library
 *************** */
router.post('/', isAuthenticated, libraryController.addBook);

/* ***************
 * Update Book in Library
 *************** */
router.put('/:id', isAuthenticated, libraryController.updateBook);

/* ***************
 * Delete Book from Library
 *************** */
router.delete('/:id', isAuthenticated, libraryController.deleteBook);

module.exports = router;
