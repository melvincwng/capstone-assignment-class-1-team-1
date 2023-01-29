var validator = require("validator");

var validationLib = {
  validateRegistrationDetails: function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var role = req.body.role;
    var password = req.body.password;

    // Use validator library to do checks
    // Only 'user' accounts can be created via the API. (Hence the role == "user" check)
    // We DON'T ALLOW 'admin' accounts to be created via the API. (Hence NO check for role == "admin")
    // Admin accounts are only pre-created by the DB Admin from the DB directly (for security reasons).
    // If someone tries to create an 'admin' account via the API, we will reject it (see below line 23)
    if (
      validator.isEmail(email) &&
      validator.isAlphanumeric(name) &&
      role == "user" &&
      validator.isAlphanumeric(password) &&
      password.length > 7
    ) {
      next();
    } else if (role == "admin") {
      res.status(500).send({
        messageOne: "Validation failed in the Registration process!",
        messageTwo:
          "Admin accounts cannot be created via the API, please contact the DB Admin directly to create an admin account if needed!",
      });
    } else {
      res.status(500).send({
        message:
          "Validation failed in the Registration process! Please check your input again.",
      });
    }
  },
  validateLoginDetails: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    // Use validator library to do checks
    if (
      validator.isEmail(email) &&
      validator.isAlphanumeric(password) &&
      password.length > 7
    ) {
      next();
    } else {
      res.status(500).send({
        message:
          "Validation failed in the Login process! Please check your input again.",
      });
    }
  },
  validateMovieDetails: function (req, res, next) {
    var name = req.body.name;
    var description = req.body.description;
    var releaseDate = req.body.releaseDate;
    var imageURL = req.body.imageURL;
    var genreID = req.body.genreID;
    var active = req.body.active;
    // a regex to check if the releaseDate is in the correct format (YYYY-MM-DD HH:MM:SS --> e.g. 2022-12-10 23:59:59)
    var regexReleaseDate = new RegExp(
      `^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$`
    );

    // Validation checks when a) adding a new movie or b) updating an existing movie
    if (
      name.length <= 255 &&
      description &&
      regexReleaseDate.test(releaseDate) &&
      validator.isURL(imageURL) &&
      validator.isNumeric(genreID) &&
      (active === "Y" || active === "N")
    ) {
      next();
    } else {
      res.status(500).send({
        message:
          "Validation failed in the Add New Movie OR Update Movie process! Please check your input again.",
      });
    }
  },
  validateGenreDetails: function (req, res, next) {
    var name = req.body.name;
    var description = req.body.description;

    // Simple validation check to check if the name and description are not too long (<= 255 characters)
    if (name.length <= 255 && description.length <= 255) {
      next();
    } else {
      res.status(500).send({
        message:
          "Validation failed in the Add New Genre process! Please check your input again (could be too long characters).",
      });
    }
  },
};

module.exports = validationLib;
