import DeleteMovieForm from "./DeleteMovieForm";
import DeleteMoviesForm from "./DeleteMoviesForm";
import AdditionalNotes from "./AdditionalNotes";
import Empty from "./Empty";
import { MoviesContext } from "../../context/moviesContext";
import { throwError } from "../../utils/functions";
import { useOutletContext } from "react-router-dom";

export default function DeleteMoviePage(props) {
  /**
   * Simulating an error caused by a) React's own source code issues or b) Logic issues with our code
   * The throwError() is to remain commented out unless you want to test/demo the Error Boundary component during the interview
   */
  // throwError();

  const movies = JSON.parse(sessionStorage.getItem("movies"));
  const moviesEmpty = movies.length === 0;
  console.log("Debugging movies BEFORE deletion -->", movies);

  const [
    setDeleteOneMovieSuccess,
    deleteOneMovie,
    setDeleteMultipleMoviesSuccess,
    deleteMultipleMovies,
  ] = useOutletContext();

  return (
    <>
      {!moviesEmpty ? (
        <>
          <b id="deleteMovieText">Delete One Movie:</b>
          <DeleteMovieForm
            setDeleteOneMovieSuccess={setDeleteOneMovieSuccess}
            deleteOneMovie={deleteOneMovie}
            movies={movies}
          />
          <b id="deleteMultipleMoviesText">Delete Multiple Movies*:</b>
          <DeleteMoviesForm
            setDeleteMultipleMoviesSuccess={setDeleteMultipleMoviesSuccess}
            deleteMultipleMovies={deleteMultipleMovies}
            movies={movies}
          />
          <AdditionalNotes />
        </>
      ) : (
        <ul id="movieUnorderedListTwo">
          <b id="deleteMovieText">Delete Movie:</b>
          <Empty />
        </ul>
      )}
    </>
  );
}
