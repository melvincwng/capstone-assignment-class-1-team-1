/**
 * Additional Notes:
 * - State of app is managed by Redux store
 * - The Redux store state is initially set by the initialMoviesArray constant
 * - Then over here in RootPage.jsx, we extract out the state of the store & save it to a variable called movies
 * - Which we then save it to sessionStorage & also pass it down as context to the components
 * - We also use various dispatch/reducer functions to update the state of the store
 * - Summary: initialMoviesArray constant --> state of Redux store --> movies variable --> sessionStorage & context --> From there, we utilize various dispatcher/reducer fns to update state of store accordingly
 */import LoginPage from "../LoginPage/index.js";
import Loader from "../Loader/index.js";
import NavBar from "../NavBar/index.js";
import MainDivWrapperComponent from "../MainDivWrapper/index.js";
import Footer from "../Footer/index.js";
import UnauthorizedInvalidPage from "../UnauthorizedInvalidPage/index.js";
import { ErrorBoundary } from "../ErrorBoundary/index.js";
import { NAVBAR_OPTIONS } from "../../utils/constants.js";
import { clearSessionStorage } from "../../utils/functions.js";
import { FILTER_MOVIES_BY_GENRE, ADD_NEW_MOVIE, DELETE_ONE_MOVIE, DELETE_MULTIPLE_MOVIES, UPDATE_MOVIES, UPDATE_PINNED_MOVIES, INITIAL_MOVIES as initialMoviesArray } from "../../utils/constants.js";
import { MoviesContext } from "../../context/moviesContext.js"; // import moviesReducer from "./reducer/moviesReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleMoviesArray, filterMoviesArray, addNewMovieDetails, deleteOneMovieDetails, deleteMultipleMoviesDetails, updateMovieDetails } from "../../redux/movieSlice.js";
import { updatePinnedMovieDetails } from "../../redux/pinnedMovieSlice.js";
import { Outlet } from "react-router-dom";
export default function RootPage() {
  /**
   * Setting up a bunch of states, context, reducer, dispatcher functions to be passed down to the components
   * TO-REMOVE-1 for FCP: const [movieIDsCounter, setMovieIDsCounter] is used only for frontend to simulate auto-increment of movieIDs.
   * In reality, this will be handled by the backend DB which will auto-increment the movieIDs for us.
   */
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(NAVBAR_OPTIONS.RETRIEVE_MOVIE);
  const [createMovieSuccess, setCreateMovieSuccess] = React.useState(false);
  const [deleteOneMovieSuccess, setDeleteOneMovieSuccess] = React.useState(false);
  const [deleteMultipleMoviesSuccess, setDeleteMultipleMoviesSuccess] = React.useState(false);
  const [updateMovieSuccess, setUpdateMovieSuccess] = React.useState(false);
  const [movieIDsCounter, setMovieIDsCounter] = React.useState(initialMoviesArray.length + 1);
  const loggedIn = sessionStorage.getItem("loggedIn");
  const isAdmin = sessionStorage.getItem("role") === "admin";
  const userAtRetrieveMoviePage = window.location.hash === "#/" || window.location.hash === "";
  const userAtCreateMoviePage = window.location.hash === "#/create-movie";
  const userAtDeleteMoviePage = window.location.hash === "#/delete-movie";
  const userAtUpdateMoviesPage = window.location.hash === "#/update-movies";
  const userAtUpdateIndividualMoviePage = window.location.hash.includes("#/update-movies");
  const userAtPinnedMoviesPage = window.location.hash === "#/pinned-movies";
  const userAtAboutUsPage = window.location.hash === "#/about-us";
  const movies = useSelector(function (store) {
    return store.movie.value;
  });
  const dispatch = useDispatch();
  const toggleMoviesFromInitialMoviesArray = function (option) {
    dispatch(toggleMoviesArray({
      name: option,
      showInitialMovies: true
    }));
  };
  const toggleMoviesFromNewMoviesArray = function (option) {
    dispatch(toggleMoviesArray({
      name: option,
      showInitialMovies: false
    }));
  };
  const filterMoviesFromInitialMoviesArray = function (genre) {
    dispatch(filterMoviesArray({
      name: FILTER_MOVIES_BY_GENRE,
      genreID: genre.genreID,
      showInitialMovies: true
    }));
  };
  const filterMoviesFromNewMoviesArray = function (genre) {
    dispatch(filterMoviesArray({
      name: FILTER_MOVIES_BY_GENRE,
      genreID: genre.genreID,
      showInitialMovies: false
    }));
  };
  const addMoviesToSessionStorage = function (payload) {
    dispatch(addNewMovieDetails({
      name: ADD_NEW_MOVIE,
      movieDetails: payload
    }));
  };
  const deleteOneMovieFromSessionStorage = function (movie) {
    dispatch(deleteOneMovieDetails({
      name: DELETE_ONE_MOVIE,
      movieID: movie.movieID
    }));
  };
  const deleteMultipleMoviesFromSessionStorage = function (movieIDsArray) {
    dispatch(deleteMultipleMoviesDetails({
      name: DELETE_MULTIPLE_MOVIES,
      movieIDs: movieIDsArray
    }));
  };
  const updateSelectedMovieInSessionStorage = function (selectedMovie) {
    dispatch(updateMovieDetails({
      name: UPDATE_MOVIES,
      selectedMovie: selectedMovie
    }));
  };
  const updatePinnedMovieInSessionStorageIfSelectedAndPinned = function (selectedMovie) {
    dispatch(updatePinnedMovieDetails({
      name: UPDATE_PINNED_MOVIES,
      selectedMovie: selectedMovie
    }));
  };

  /**
   * Consolidating the dispatcher functions into one variable to be passed down to the components (depending on the state of createMovieSuccess, deleteOneMovieSuccess, deleteMultipleMoviesSuccess, updateMovieSuccess... etc)
   */
  const toggleMovies = createMovieSuccess || deleteOneMovieSuccess || deleteMultipleMoviesSuccess || updateMovieSuccess ? toggleMoviesFromNewMoviesArray : toggleMoviesFromInitialMoviesArray;
  const filterMovies = createMovieSuccess || deleteOneMovieSuccess || deleteMultipleMoviesSuccess || updateMovieSuccess ? filterMoviesFromNewMoviesArray : filterMoviesFromInitialMoviesArray;
  const addMovies = addMoviesToSessionStorage;
  const deleteOneMovie = deleteOneMovieFromSessionStorage;
  const deleteMultipleMovies = deleteMultipleMoviesFromSessionStorage;
  const updateSelectedMovie = updateSelectedMovieInSessionStorage;
  const updatePinnedMovie = updatePinnedMovieInSessionStorageIfSelectedAndPinned;

  /**
   * Explanation of the two useEffects blocks
   *  - A) When the page is refreshed, we want to clear the sessionStorage first (clear previously edited or manipulated data when adding/removing movies) --> first useEffect
   *  - B) After clearing the stored movies key/array in sessionStorage, we want to set the movies array to the context of the initialMoviesArray (a fresh start) --> second useEffect
   *  - C) In short, for A & B, we are essentially "reset" the movies array in sessionStorage when reloading the page (A - clear previous data & B - Reinitialize/Reset the data)
   */
  React.useEffect(() => {
    window.addEventListener("beforeunload", clearSessionStorage);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);
  React.useEffect(() => {
    if (!sessionStorage.getItem("movies")) {
      sessionStorage.setItem("movies", JSON.stringify(movies));
    }
    if (!sessionStorage.getItem("pinnedMovies")) {
      sessionStorage.setItem("pinnedMovies", JSON.stringify([]));
    }
  }, []);

  /**
   * We are using React-Router-DOM (HashRouter) to do the routing
   * Hence we need to use the <Outlet /> component to render the components that are nested within the <RootPage /> component
   * E.g. when we are at the /create-movie route, we want to render the <CreateMoviePage /> component that will be linked to a particular <Outlet /> component that's nested within the <RootPage /> component
   * Hence, we need to pass down the neccessary props from the <Outlet /> component to the <CreateMoviePage /> component
   *  A) For Outlet component, we will use 'context' prop/attribute to pass down the props
   *  B) For the respective component (e.g. CreateMoviePage), we will use the 'useOutletContext' from react-router-dom to receive the props from the Outlet component
   * References:
   * - https://reactrouter.com/en/main/hooks/use-outlet-context
   * - https://stackoverflow.com/questions/63765196/pass-props-to-outlet-in-react-router-v6
   */

  return !login ? /*#__PURE__*/React.createElement(React.Fragment, null, !loading && /*#__PURE__*/React.createElement(LoginPage, {
    setLogin: setLogin,
    setLoading: setLoading
  }), loading && /*#__PURE__*/React.createElement(Loader, {
    loading: loading
  })) : /*#__PURE__*/React.createElement(MoviesContext.Provider, {
    value: movies
  }, /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(NavBar, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    toggleMovies: toggleMovies
  })), /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(MainDivWrapperComponent, null, userAtRetrieveMoviePage ? /*#__PURE__*/React.createElement(Outlet, {
    context: [toggleMovies, filterMovies, setActiveTab]
  }) : userAtCreateMoviePage && loggedIn && isAdmin ? /*#__PURE__*/React.createElement(Outlet, {
    context: [setCreateMovieSuccess, addMovies, setMovieIDsCounter, movieIDsCounter]
  }) : userAtDeleteMoviePage && loggedIn && isAdmin ? /*#__PURE__*/React.createElement(Outlet, {
    context: [setDeleteOneMovieSuccess, deleteOneMovie, setDeleteMultipleMoviesSuccess, deleteMultipleMovies]
  }) : (userAtUpdateMoviesPage || userAtUpdateIndividualMoviePage) && loggedIn && isAdmin ? /*#__PURE__*/React.createElement(Outlet, {
    context: [setUpdateMovieSuccess, updateSelectedMovie, updatePinnedMovie]
  }) : userAtPinnedMoviesPage ? /*#__PURE__*/React.createElement(Outlet, {
    context: [setActiveTab]
  }) : userAtAboutUsPage ? /*#__PURE__*/React.createElement(Outlet, null) : /*#__PURE__*/React.createElement(UnauthorizedInvalidPage, null))), /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(Footer, null)));
}