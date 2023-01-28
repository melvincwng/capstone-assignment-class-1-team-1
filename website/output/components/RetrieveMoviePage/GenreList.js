import Genre from "./Genre.js";
export default function GenreList({
  filterMovies,
  genres
}) {
  return genres.map((genre, index) => /*#__PURE__*/React.createElement(Genre, {
    filterMovies: filterMovies,
    genre: genre,
    key: index
  }));
}