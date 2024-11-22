const utilities = {};

/* ***************
 * Middleware For Handling Errors
 * Wrap other functions in this for general error handling
 *************** */
utilities.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = utilities;
