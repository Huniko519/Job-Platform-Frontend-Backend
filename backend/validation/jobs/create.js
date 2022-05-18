const Validator = require("validator");
const isEmpty = require("../../utils/is-empty");

module.exports = function validateCreateJobInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isEmail(data.email)) {
    errors.title = "title is invalid";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
