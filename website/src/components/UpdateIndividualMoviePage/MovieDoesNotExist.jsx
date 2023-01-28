import { Link } from "react-router-dom";

export default function MovieDoesNotExist() {
  return (
    <div id="movieDoesNotExist" style={{ minHeight: "400px" }}>
      <b>Movie does not exist!</b>
      <br />
      You are trying to edit a movie that either:
      <ul>
        <li>A) Doesn't exist anymore ❌ or</li>
        <li>B) Doesn't exist in the first place ❓</li>
      </ul>
      <Link to="/update-movies">⬅️ Click to return to Update Movies Page</Link>
    </div>
  );
}
