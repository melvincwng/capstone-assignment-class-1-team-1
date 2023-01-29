import { YES, NO } from "../../utils/constants";
import { convertGenreIDToGenreType, formatDate } from "../../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { pinMovie, unpinMovie } from "../../redux/pinnedMovieSlice";
import { Link } from "react-router-dom";
import { NAVBAR_OPTIONS } from "../../utils/constants";

export default function Movie({
  movieID,
  name,
  description,
  releaseDate,
  imageURL,
  genreID,
  active,
  setActiveTab,
}) {
  const movieDetails = {
    movieID,
    name,
    description,
    releaseDate,
    imageURL,
    genreID,
    active,
  };
  const isMovieActive = active === YES ? "✔️" : active === NO ? "❌" : "❓";
  const genreType = convertGenreIDToGenreType(genreID);
  const pinnedMoviesArray = useSelector(function (store) {
    return store.pinnedMovie.value;
  });
  const pinnedMoviesCount = pinnedMoviesArray.length;
  const isMoviePinned = pinnedMoviesArray.filter((pinnedMovie) => {
    return (
      pinnedMovie.movieID === movieID &&
      pinnedMovie.name === name &&
      pinnedMovie.description === description &&
      pinnedMovie.releaseDate === releaseDate &&
      pinnedMovie.imageURL === imageURL &&
      pinnedMovie.genreID === genreID &&
      pinnedMovie.active === active
    );
  }).length;
  const moviePinnedOrUnpinnedEmoji = isMoviePinned ? "💖" : "🤍";
  const dispatch = useDispatch();
  const changeMoviePinnedStatus = () => {
    if (!isMoviePinned) {
      if (pinnedMoviesCount < 5) {
        dispatch(pinMovie({ movieDetails }));
      } else {
        alert("You can only pin 5 movies at a time!");
      }
    } else {
      dispatch(unpinMovie({ movieDetails }));
    }
  };
  const loggedIn = sessionStorage.getItem("loggedIn");
  const isAdmin = sessionStorage.getItem("role") === "admin";

  function setNavBarActiveTabToUpdateMovie() {
    setActiveTab(NAVBAR_OPTIONS.UPDATE_MOVIES);
  }

  // Formatting the release date from ISO string (e.g. 2022-09-01T00:00:00.000Z) to a more readable format (e.g. 2022-09-01 00:00:00)
  const formattedReleaseDate = formatDate(new Date(releaseDate));

  return (
    <li className="movieListItem" id={movieID}>
      <a
        href={`https://www.google.com/search?q=${name}`}
        className="movieLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={imageURL}
          alt="Movie Poster"
          className="moviePosterImage"
          loading="lazy"
        ></img>
        <div className="imageOverlay">
          <div>
            <b>{name}</b>
          </div>
          <br />
          <div className="reduceFontSize">{description}</div>
          <br />
          <div className="reduceFontSize">{formattedReleaseDate}</div>
          <br />
          <div className="reduceFontSize">{genreType}</div>
        </div>
        <br />
        {name}
      </a>{" "}
      <span>
        <span>{isMovieActive}</span>{" "}
        <span onClick={changeMoviePinnedStatus} style={{ cursor: "pointer" }}>
          {moviePinnedOrUnpinnedEmoji}
        </span>{" "}
        <span
          onClick={setNavBarActiveTabToUpdateMovie}
          style={{ cursor: "pointer" }}
        >
          {loggedIn && isAdmin ? (
            <Link to={`/update-movies/${movieID}`}>✏️</Link>
          ) : (
            ""
          )}
        </span>
      </span>
    </li>
  );
}
