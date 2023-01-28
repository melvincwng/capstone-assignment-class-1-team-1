import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "../RetrieveMoviePage/MovieList";
import Empty from "./Empty";
import { useOutletContext } from "react-router-dom";

export default function PinnedMoviesPage() {
  const dispatch = useDispatch();
  const [setActiveTab] = useOutletContext();
  const pinnedMoviesArray = useSelector(function (store) {
    return store.pinnedMovie.value;
  });
  console.log("Pinned Movies Array: ", pinnedMoviesArray);

  return (
    <>
      {pinnedMoviesArray.length ? (
        <>
          <b id="pinnedMoviesText">Pinned Movies:</b>
          <br />
          <ul id="movieUnorderedList">
            <MovieList movies={pinnedMoviesArray} setActiveTab={setActiveTab} />
          </ul>
        </>
      ) : (
        <ul id="movieUnorderedListTwo">
          <b id="pinnedMoviesText">Pinned Movies:</b>
          <Empty />
        </ul>
      )}
    </>
  );
}
