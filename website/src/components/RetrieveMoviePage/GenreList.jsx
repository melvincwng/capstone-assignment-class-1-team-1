import Genre from "./Genre";

export default function GenreList({ filterMovies, genres }) {
  return genres.map((genre, index) => (
    <Genre filterMovies={filterMovies} genre={genre} key={index} />
  ));
}
