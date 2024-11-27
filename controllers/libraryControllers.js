const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Display Library
const getLibrary = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('library').find();

    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

// Display Single Book by Id
const getBookById = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('library').find({ _id: bookId });

    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

// Add Book to Library
const addBook = async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        format: req.body.format,
        pages: req.body.pages,
        status: req.body.status,
        read_count: req.body.read_count,
        rating: req.body.rating,
        owned: req.body.owned
    };

    const response = await mongodb.getDatabase().db().collection('library').insertOne(book);

    if (response.acknowledged) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error) || 'An error occurred while adding the book.';
    }
};

// Update Book by Id
const updateBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);

    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        format: req.body.format,
        pages: req.body.pages,
        status: req.body.status,
        read_count: req.body.read_count,
        rating: req.body.rating,
        owned: req.body.owned
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('library')
        .replaceOne({ _id: bookId }, book);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error) || 'An error occurred while updating the book.';
    }
};

// Delete Book by Id
const deleteBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('library')
        .deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error) || 'An error occurred while deleting the book.';
    }
};

module.exports = { getLibrary, getBookById, addBook, updateBook, deleteBook };
