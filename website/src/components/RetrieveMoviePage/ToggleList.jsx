import Toggle from "./Toggle";

export default function ToggleList({ toggleMovies, toggleMoviesOptions }) {
  return toggleMoviesOptions.map((option, index) => (
    <Toggle toggleMovies={toggleMovies} option={option} key={index} />
  ));
}
