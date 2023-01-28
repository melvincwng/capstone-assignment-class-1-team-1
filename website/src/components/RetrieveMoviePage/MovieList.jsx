import Movie from "./Movie";

export default function MovieList(props) {
  return props.movies.map(function (movie, index) {
    return (
      <Movie
        movieID={movie.movieID}
        name={movie.name}
        description={movie.description}
        releaseDate={movie.releaseDate}
        imageURL={movie.imageURL}
        genreID={movie.genreID}
        active={movie.active}
        setActiveTab={props.setActiveTab}
        key={index}
      />
    );
  });
}
