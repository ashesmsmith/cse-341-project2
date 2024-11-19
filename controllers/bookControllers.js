const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Display All Books
const getAllBooks = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('books').find();

  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

// Display Single Book by Id
const getBookById = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });

  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  });
};

// Create Book
const createBook = async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    isbn: {
      $numberLong: req.body.isbn
    },
    rating: req.body.rating,
    owned: req.body.owned
  };

  const response = await mongodb.getDatabase().db().collection('books').insertOne(book);

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
    isbn: {
      $numberLong: req.body.isbn
    },
    rating: req.body.rating,
    owned: req.body.owned
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('books')
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

  const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error) || 'An error occurred while deleting the book.';
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
