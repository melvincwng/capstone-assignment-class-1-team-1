import CreateMovieForm from "./CreateMovieForm";
import { useOutletContext } from "react-router-dom";

export default function CreateMoviePage(props) {
  const [setCreateMovieSuccess, addMovies] = useOutletContext();

  return (
    <>
      <b id="createMovieText">Create Movie:</b>
      <CreateMovieForm
        setCreateMovieSuccess={setCreateMovieSuccess}
        addMovies={addMovies}
      />
    </>
  );
}
