export default function Genre({ filterMovies, genre }) {
  return (
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={() => {
          filterMovies(genre);
        }}
      >
        {genre.name}
      </a>
    </li>
  );
}
