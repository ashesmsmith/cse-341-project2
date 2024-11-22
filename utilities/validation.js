const { body, validationResult } = require('express-validator');
const validate = {};

validate.bookRules = () => {
  return [
    body('title').trim().isString().notEmpty().withMessage('Please enter a valid title.'),

    body('author').trim().isString().notEmpty().withMessage('Please enter a valid author.'),

    body('isbn').notEmpty().withMessage('Please enter a valid isbn.'),

    body('format').trim().isString().notEmpty().withMessage('Please enter a valid format.'),

    body('pages').trim().notEmpty().withMessage('Please enter a valid number of pages.'),

    body('firstPublished').trim().notEmpty().withMessage('Please enter a valid first published date.'),

    body('genre').trim().notEmpty().withMessage('Please enter a valid genre.')
  ];
};

validate.bookValidation = async (req, res, next) => {
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
