import Movie from "./Movie.js";
export default function MovieList(props) {
  return props.movies.map(function (movie, index) {
    return /*#__PURE__*/React.createElement(Movie, {
      movieID: movie.movieID,
      name: movie.name,
      description: movie.description,
      releaseDate: movie.releaseDate,
      imageURL: movie.imageURL,
      genreID: movie.genreID,
      active: movie.active,
      setActiveTab: props.setActiveTab,
      key: index
    });
  });
}