import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateMoviesPage() {
  const movies = useSelector(function (store) {
    return store.movie.value;
  });
  const arrayOfMovieIDs = movies.map(function (movie) {
    return movie.movieID;
  });

  return (
    <div style={{ minHeight: "400px" }}>
      <b id="updateMoviesText">Update Movies:</b>
      <br />
      Which One 🤔?
      <br />
      {arrayOfMovieIDs.length
        ? arrayOfMovieIDs.map(function (movieID) {
            return (
              <div key={movieID}>
                <Link to={`/update-movies/${movieID}`}>Movie {movieID}</Link>
              </div>
            );
          })
        : "No movies available to update 😔"}
    </div>
  );
}
