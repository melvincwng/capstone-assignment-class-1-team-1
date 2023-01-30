var express = require("express");
var bodyParser = require("body-parser");
var movie = require("../model/movie");
var genre = require("../model/genre");
var user = require("../model/user.js");
var verificationLib = require("../auth/verificationLib.js");
var validationLib = require("../validate/validationLib.js");
var cors = require("cors");
const multer = require("multer");

// To create the /images folder if it does not exist (to store uploaded images)
var fs = require("fs");
var imagesDirectory = "./images";
if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory);
}

// Instantiate an express app
var app = express();

// These 3 lines are needed to allow CORS (Cross-Origin Resource Sharing) to work (Add more origins if needed to allow CORS from other domains)
// Take note CORS does not prevent against CSRF attacks. We need to implement CSRF protection as well (see line 36 verifyAgainstCSRFAttacks below)
// Even though CORS may block a particular request, the end result is essentially it prevents the client from seeing/accessing the response from the server.
// However, the server still receives the request and processes it. Hence, it is still vulnerable to CSRF attacks.
// With our own custom middleware, it will prevent the server from processing the request if it is a CSRF attack (verifyAgainstCSRFAttacks middleware below)
// UPDATE - 16/01/2023: 'Changed line 29 to 'origin: true' instead of 'origin: ["http://127.0.0.1:5500", "http://localhost:5500"]' because assignment 2 requires us to allow CORS from ALL origins
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig)); // You can place this after app.options(…) - *Modified* with corsConfig to make setting/clearing of cookies with JWT work!

// These 2 lines are needed to process cookies (containing our JWT token) in our Express app
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// These 3 lines of code are required for POST & PUT methods (to handle the request body)
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()); // parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded

// These 3 blocks of code below involve the usage of 'Multer' library to handle file uploads (Multer middleware)
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

let upload = multer({ storage, fileFilter });

// Application Level Middleware 1 (applies to all routes) to prevent against CSRF attacks
// To disable this middleware by commenting out the line below, in case it causes any unexpected issues to the app during the interview
app.use(verificationLib.verifyAgainstCSRFAttacks);

// Application Level Middleware 2 to serve static files (e.g. images) from the /images folder
app.use("/images", express.static("images"));

// Test route - to check if the server is up and running
app.get("/health", function (req, res) {
  res.status(200).send({ status: "OK" });
});

// A) MOVIE ROUTES
// Get all movies, be it i) active or ii) inactive or iii) both
app.get("/movies", function (req, res) {
  console.log("What are the query strings", req.query);

  const queryStringValue = req.query.active;
  const getActiveMovies = queryStringValue === "Y" || queryStringValue === "y";
  const getInactiveMovies =
    queryStringValue === "N" || queryStringValue === "n";

  if (getActiveMovies) {
    movie.getActiveMovies(queryStringValue, function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  } else if (getInactiveMovies) {
    movie.getInactiveMovies(queryStringValue, function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  } else {
    // If no query string is provided, OR if invalid query string is provided, we return all movies (active & inactive)
    movie.getAllMovies(function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  }
});

// Get movies (active or inactive) based on either i) substring of movie name or ii) genreID
app.get("/movies/search", function (req, res) {
  const getMoviesByNameSubstring = req.query.name;
  const getMoviesByGenreID = req.query.genreID;
  console.log(
    "What are the query strings",
    getMoviesByNameSubstring,
    getMoviesByGenreID
  );

  if (getMoviesByNameSubstring && getMoviesByGenreID) {
    movie.getMoviesByNameSubstringAndGenreID(
      getMoviesByNameSubstring,
      getMoviesByGenreID,
      function (err, result) {
        if (!err) {
          res.send(result);
        } else {
          console.log(err);
          res
            .status(500)
            .send({ message: "An unexpected error has occurred!" });
        }
      }
    );
  } else if (getMoviesByNameSubstring) {
    movie.getMoviesByNameSubstring(
      getMoviesByNameSubstring,
      function (err, result) {
        if (!err) {
          res.send(result);
        } else {
          console.log(err);
          res
            .status(500)
            .send({ message: "An unexpected error has occurred!" });
        }
      }
    );
  } else if (getMoviesByGenreID) {
    movie.getMoviesByGenreID(getMoviesByGenreID, function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  } else {
    res.status(400).send({
      message: "Invalid or No query string(s) detected! Please try again.",
    });
  }
});

// Sort Movies by Ascending A to Z
app.get("/movies/AtoZ", function (req, res) {
  movie.sortMoviesAtoZ(function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send({ message: "An unexpected error has occurred!" });
    }
  });
});

// Sort Movies from Z to A
app.get("/movies/ZtoA", function (req, res) {
  movie.sortMoviesZtoA(function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send({ message: "An unexpected error has occurred!" });
    }
  });
});

// Post a new movie
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.post(
  "/movies",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  validationLib.validateMovieDetails,
  function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var releaseDate = req.body.releaseDate;
    var imageURL = req.body.imageURL;
    var genreID = req.body.genreID;
    var active = req.body.active;

    movie.addMovie(
      name,
      description,
      releaseDate,
      imageURL,
      genreID,
      active,
      function (err, result) {
        if (!err) {
          result = result + " movie inserted";
          console.log(result);
          res.send({ message: result });
        } else {
          console.log("Error object:", JSON.stringify(err));
          res.status(500).send(err);
        }
      }
    );
  }
);

// Update movie details
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.put(
  "/movies/:movieID",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  validationLib.validateMovieDetails,
  function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var releaseDate = req.body.releaseDate;
    var imageURL = req.body.imageURL;
    var genreID = req.body.genreID;
    var active = req.body.active;
    var movieID = req.params.movieID;
    var nameOfLoggedInUser = req.name;
    var role = req.role;
    const updatedByWho = nameOfLoggedInUser + " (" + role + ")";

    movie.updateMovie(
      name,
      description,
      releaseDate,
      imageURL,
      genreID,
      active,
      movieID,
      updatedByWho,
      function (err, result) {
        if (!err) {
          result = result + " movie updated";
          console.log(result);
          res.status(200).send({ message: result });
        } else {
          console.log("Error object:", JSON.stringify(err));
          res.status(500).send(err);
        }
      }
    );
  }
);

// Delete a movie (ADDITIONAL endpoint created for FCP project - not part of original BDD requirements actually)
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.delete(
  "/movies/:movieID",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  function (req, res) {
    var movieID = req.params.movieID;
    movie.deleteMovie(movieID, function (err, result) {
      if (!err) {
        result = result + " movie deleted!";
        console.log(result);
        res.status(200).send({ message: result });
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  }
);

// Delete MULTIPLE movies (ADDITIONAL endpoint created for FCP project - not part of original BDD requirements actually)
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.delete(
  "/movies",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  function (req, res) {
    var movieIDs = req.body.movieIDs;
    movie.deleteMultipleMovies(movieIDs, function (err, result) {
      if (!err) {
        result = result + " movies deleted!";
        console.log(result);
        res.status(200).send({ message: result });
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  }
);

// Get movie image upload form & Upload movie image (1 path - i.e. /uploads but it can accept 2 methods GET & POST)
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app
  .get(
    "/uploads",
    [
      verificationLib.verifyIsLoggedInWithValidJWT,
      verificationLib.verifyIsAdmin,
    ],
    function (req, res) {
      res.status(200).send(`
          <div>
            <h1>Upload Movie Image (TEST DEMO)</h1>
            <form method="post" enctype="multipart/form-data">
              <input type="file" name="movieImage" />
              <button type="submit" className="upload-button">
                Upload
              </button>
            </form>
          </div>   
        `);
    }
  )
  .post(
    "/uploads",
    [
      verificationLib.verifyIsLoggedInWithValidJWT,
      verificationLib.verifyIsAdmin,
      upload.single("movieImage"),
    ],
    function (req, res) {
      if (req.file) {
        console.log("File uploaded/saved successfully to server hard-disk!");
        res.status(200).send({ message: "File uploaded successfully!" });
      } else {
        console.log("File not uploaded!");
        res.status(500).send({
          message:
            "File not uploaded due to some technical issues! Perhaps missing the actual file!",
        });
      }
    }
  );

// B) GENRE ROUTES
// Get all genres
app.get("/genres", function (req, res) {
  genre.getGenres(function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send({ message: "An unexpected error has occurred!" });
    }
  });
});

// Add a new genre
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.post(
  "/genres",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  validationLib.validateGenreDetails,
  function (req, res) {
    var name = req.body.name;
    var description = req.body.description;

    genre.addGenre(name, description, function (err, result) {
      if (!err) {
        result = result + " genre inserted";
        console.log(result);
        res.send({ message: result });
      } else {
        console.log("Error object:", JSON.stringify(err));
        res.status(500).send(err);
      }
    });
  }
);

// Delete a genre
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.delete(
  "/genres/:genreID",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  function (req, res) {
    var genreID = req.params.genreID;
    genre.deleteGenre(genreID, function (err, result) {
      if (!err) {
        result = result + " genre deleted!";
        console.log(result);
        res.status(200).send({ message: result });
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  }
);

// C) USER ROUTES
// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.get(
  "/users",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  function (req, res) {
    user.getUsers(function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  }
);

// Protected resource that requires admin login. Normal user or not logged in personnel should not be able to access this resource.
app.get(
  "/users/:userID",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsAdmin,
  function (req, res) {
    var userID = req.params.userID;
    user.getUser(userID, function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  }
);

// Protected route - "protected" by verifyIsNotLoggedIn & validateRegistrationDetails middleware
// We only want to allow users to register a new account only if they fulfill the following 2 conditions below, as checked by the 2 middlewares:
// - 1)  They are NOT logged in (Logged in users should not be able to register a new account)
// - 2a) They have provided all the required details (name, email, role, password) & the details are VALID
// - 2b) They can only register as a normal user (role = "user"). Admin account (role == "admin") cannot be created by this API endpoint (only can be created by contacting the DB admin to insert a new admin account record manually into the DB)
app.post(
  "/users",
  verificationLib.verifyIsNotLoggedIn,
  validationLib.validateRegistrationDetails,
  function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var role = req.body.role;
    var password = req.body.password;

    user.addUser(name, email, role, password, function (err, result) {
      if (!err) {
        result = result + " user inserted";
        console.log(result);
        res.send({ message: result });
      } else {
        console.log("Error object:", JSON.stringify(err));
        res.status(500).send(err);
      }
    });
  }
);

// Protected route - "protected" by verifyIsLoggedInWithValidJWT & verifyIsRequestSelfInitiated middlewares (see comment below for more details)
// Only logged in users can update their own account details (i.e. they can only update their own account details, and not other users' account details)
app.put(
  "/users/:userID",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsRequestSelfInitiated,
  function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var userID = req.params.userID;

    user.updateUser(email, password, userID, function (err, result) {
      if (!err) {
        result = result + " record updated";
        console.log(result);
        res.send({ message: result });
      } else {
        console.log("error object:", JSON.stringify(err));
        res.status(500).send(err);
      }
    });
  }
);

// Protected route - "protected" by verifyIsLoggedInWithValidJWT & verifyIsRequestSelfInitiated middlewares (see comment below for more details)
// Only logged in users can delete their own account (i.e. they can only delete their own account, and not other users' accounts)
app.delete(
  "/users/:userID",
  verificationLib.verifyIsLoggedInWithValidJWT,
  verificationLib.verifyIsRequestSelfInitiated,
  function (req, res) {
    var userID = req.params.userID;

    user.deleteUser(userID, function (err, result) {
      if (!err) {
        result = result + " record deleted";
        console.log(result);
        res.send({ message: result });
      } else {
        console.log("error object:", JSON.stringify(err));
        res.status(500).send(err);
      }
    });
  }
);

// Login route - "protected" by verifyIsNotLoggedIn & validateLoginDetails middlewares
// In this route, we set a cookie in the client side (browser) to store the JWT token
app.post(
  "/login",
  verificationLib.verifyIsNotLoggedIn,
  validationLib.validateLoginDetails,
  function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, result) {
      if (!err) {
        // 'result' variable here contains the JWT token
        const jwt = result;
        console.log("What is the JWT generated (for debugging): ", jwt);

        // Set the cookie in the client side (browser) to store the JWT token
        // Visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite for more information on sameSite = 'none';
        res.cookie("JWT", jwt, {
          // You are setting the cookie here, and the name of your cookie is `JWT`
          httpOnly: true, // client-side js cannot access cookie info, protecting against XSS attacks
          secure: true, // use HTTPS, prevent Man-in-the-middle attacks. If set to true, the cookie will only be sent over HTTPS (not HTTP). Hence POSTMAN, which we use to test our API endpoints, will not be able to send & set the cookie to Postman directly since it's http://localhost:8081. To make Postman set the cookie directly, we can set secure to false temporarily (for testing purposes only).
          sameSite: "none", // need to set sameSite attribute to 'none' so that when we make a cross-origin request to the server, it will allow the cookie (which was sent by the server to the client) to be sent back in subsequent requests to the server
        });

        // Return a success message to the client side
        res.send({ result: "Logged in!", jwt: jwt });
      } else {
        res.status(500).send(err);
      }
    });
  }
);

// Logout route - "protected" by verifyIsLoggedInWithValidJWT middleware
// In this route, we clear the cookie which contains the JWT token in the client side (browser)
app.post(
  "/logout",
  verificationLib.verifyIsLoggedInWithValidJWT,
  function (req, res) {
    try {
      // Clear the cookie which contains the JWT token
      // Need to insert an 'options' object in res.clearCookie() that is identical (excluding expires) to the 'options' object in res.cookie()
      // If not the cookie won't be deleted...
      res.clearCookie("JWT", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.send({ message: "Logged out 🙂!" });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = app;
