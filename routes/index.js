const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

// Swagger - http://localhost:8080/api-docs
router.use('/', require('./swagger'));

// Home Page - http://localhost:8080/
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() 
    ? 'Welcome to Books! You are logged in'  
    : 'Welcome to Books! You are logged out.');
});

// Book Page(s) - http://localhost:8080/books
router.use('/books', require('./bookRoutes'));

// Library Page(s) - http://localhost:8080/library
router.use('/library', requiresAuth(), require('./libraryRoutes'));

module.exports = router;
