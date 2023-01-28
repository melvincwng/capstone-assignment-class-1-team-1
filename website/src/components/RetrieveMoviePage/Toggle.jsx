export default function Toggle({ toggleMovies, option }) {
  return (
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={() => {
          toggleMovies(option);
        }}
      >
        {option}
      </a>
    </li>
  );
}
