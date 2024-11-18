const router = require('express').Router();
const bookRoutes = require('./bookRoutes');

// Swagger
router.use('/', require('./swagger'));

// Home Page - http://localhost:8080/
router.get('/', (req, res) => {
  res.send('Welcome to Books!');
});

// Book Page(s) - http://localhost:8080/books
router.use('/books', bookRoutes);

module.exports = router;
