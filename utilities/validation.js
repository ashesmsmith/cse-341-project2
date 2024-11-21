const { body, validationResult } = require('express-validator');
const validate = {};

validate.bookRules = () => {
  return [
    body('title').trim().isString().notEmpty(),

    body('author').trim().isString().notEmpty(),

    body('isbn').notEmpty(),

    body('format').trim().isString().notEmpty(),

    body('pages').trim().notEmpty(),

    body('firstPublished').trim().notEmpty(),

    body('genre').trim().notEmpty()
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
