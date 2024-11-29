const { body, validationResult } = require('express-validator');
const validate = {};

validate.bookRules = () => {
    return [
    body('title')
      .trim()
      .notEmpty()
      .isString()
      .withMessage('Please enter a valid title.'),

    body('author')
      .trim()
      .notEmpty()
      .isString()
      .withMessage('Please enter a valid author.'),

    body('isbn')
      .trim()
      .notEmpty()
      .withMessage('Please enter a valid isbn.'),

    body('format')
      .trim()
      .notEmpty()
      .isString()
      .isIn('Paperback', 'Hardcover', 'Digital')
      .withMessage('Please enter a valid format.'),

    body('pages')
      .trim()
      .notEmpty()
      .toInt()
      .withMessage('Please enter a valid number of pages.'),

    body('first_published')
      .trim()
      .notEmpty()
      .withMessage('Please enter a valid first published date.'),

    body('genre')
      .trim()
      .notEmpty()
      .withMessage('Please enter a valid genre.')
    ];
};

validate.libraryRules = () => {
  return [
  body('title')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid title.'),

  body('author')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid author.'),

  body('isbn')
    .trim()
    .notEmpty()
    .withMessage('Please enter a valid isbn.'),

  body('format')
    .trim()
    .notEmpty()
    .isString()
    .isIn('Paperback', 'Hardcover', 'Digital')
    .withMessage('Please enter a valid format.'),

  body('pages')
    .trim()
    .notEmpty()
    .toInt()
    .withMessage('Please enter a valid number of pages.'),

  body('status')
    .trim()
    .notEmpty()
    .isIn('Read', 'TBR')
    .withMessage('Please enter a valid status.'),

  body('read_count')
    .trim()
    .notEmpty()
    .toInt()
    .withMessage('Please enter a valid read count.'),

  body('rating')
    .trim()
    .notEmpty()
    .toInt()
    .withMessage('Please enter a valid rating.'),

  body('owned')
    .trim()
    .notEmpty()
    .toInt()
    .withMessage('Please enter a valid owned.')
  ];
};

validate.validation = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);

  if (errors.isEmpty()) {
      return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
      errors: extractedErrors
  });
};

module.exports = validate;
