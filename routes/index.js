const router = require('express').Router();
const passport = require('passport');

// Swagger - http://localhost:8080/api-docs
router.use('/', require('./swagger'));

// Login - http://localhost:8080/login
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Logout - http://localhost:8080/logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// Home Page - http://localhost:8080/
router.get('/', (req, res) => {
    res.send('Welcome to Books!');
});

// Book Page(s) - http://localhost:8080/books
router.use('/books', require('./bookRoutes'));

// Library Page(s) - http://localhost:8080/library
router.use('/library', require('./libraryRoutes'));

module.exports = router;
