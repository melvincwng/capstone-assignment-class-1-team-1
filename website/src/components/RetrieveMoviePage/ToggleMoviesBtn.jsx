/**
 * A Bootstrap button that toggles the hiding or showing past movies
 */

import ToggleList from "./ToggleList";

export default function ToggleMoviesBtn({ toggleMovies, toggleMoviesOptions }) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="toggleMoviesBtn"
      >
        Toggle Movies
      </button>
      <ul className="dropdown-menu genreOptions">
        <ToggleList
          toggleMovies={toggleMovies}
          toggleMoviesOptions={toggleMoviesOptions}
        />
      </ul>
    </div>
  );
}
