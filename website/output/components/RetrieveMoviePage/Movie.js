import { YES, NO } from "../../utils/constants.js";
import { convertGenreIDToGenreType } from "../../utils/functions.js";
import { useSelector, useDispatch } from "react-redux";
import { pinMovie, unpinMovie } from "../../redux/pinnedMovieSlice.js";
import { Link } from "react-router-dom";
import { NAVBAR_OPTIONS } from "../../utils/constants.js";
export default function Movie({
  movieID,
  name,
  description,
  releaseDate,
  imageURL,
  genreID,
  active,
  setActiveTab
}) {
  const movieDetails = {
    movieID,
    name,
    description,
    releaseDate,
    imageURL,
    genreID,
    active
  };
  const isMovieActive = active === YES ? "✔️" : active === NO ? "❌" : "❓";
  const genreType = convertGenreIDToGenreType(genreID);
  const pinnedMoviesArray = useSelector(function (store) {
    return store.pinnedMovie.value;
  });
  const pinnedMoviesCount = pinnedMoviesArray.length;
  const isMoviePinned = pinnedMoviesArray.filter(pinnedMovie => {
    return pinnedMovie.movieID === movieID && pinnedMovie.name === name && pinnedMovie.description === description && pinnedMovie.releaseDate === releaseDate && pinnedMovie.imageURL === imageURL && pinnedMovie.genreID === genreID && pinnedMovie.active === active;
  }).length;
  const moviePinnedOrUnpinnedEmoji = isMoviePinned ? "💖" : "🤍";
  const dispatch = useDispatch();
  const changeMoviePinnedStatus = () => {
    if (!isMoviePinned) {
      if (pinnedMoviesCount < 5) {
        dispatch(pinMovie({
          movieDetails
        }));
      } else {
        alert("You can only pin 5 movies at a time!");
      }
    } else {
      dispatch(unpinMovie({
        movieDetails
      }));
    }
  };
  const loggedIn = sessionStorage.getItem("loggedIn");
  const isAdmin = sessionStorage.getItem("role") === "admin";
  function setNavBarActiveTabToUpdateMovie() {
    setActiveTab(NAVBAR_OPTIONS.UPDATE_MOVIES);
  }
  return /*#__PURE__*/React.createElement("li", {
    className: "movieListItem",
    id: movieID
  }, /*#__PURE__*/React.createElement("a", {
    href: `https://www.google.com/search?q=${name}`,
    className: "movieLink",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    src: imageURL,
    alt: "Movie Poster",
    className: "moviePosterImage",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "imageOverlay"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, name)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "reduceFontSize"
  }, description), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "reduceFontSize"
  }, releaseDate), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "reduceFontSize"
  }, genreType)), /*#__PURE__*/React.createElement("br", null), name), " ", /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, isMovieActive), " ", /*#__PURE__*/React.createElement("span", {
    onClick: changeMoviePinnedStatus,
    style: {
      cursor: "pointer"
    }
  }, moviePinnedOrUnpinnedEmoji), " ", /*#__PURE__*/React.createElement("span", {
    onClick: setNavBarActiveTabToUpdateMovie,
    style: {
      cursor: "pointer"
    }
  }, loggedIn && isAdmin ? /*#__PURE__*/React.createElement(Link, {
    to: `/update-movies/${movieID}`
  }, "\u270F\uFE0F") : "")));
}