import { Provider } from "react-redux";
import store from "./redux/storage.js";
import RootPage from "./components/RootPage/index.js";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RetrieveMoviePage from "./components/RetrieveMoviePage/index.js";
import CreateMoviePage from "./components/CreateMoviePage/index.js";
import DeleteMoviePage from "./components/DeleteMoviePage/index.js";
import UpdateMoviesPage from "./components/UpdateMoviesPage/index.js";
import UpdateIndividualMoviePage from "./components/UpdateIndividualMoviePage/index.js";
import PinnedMoviesPage from "./components/PinnedMoviesPage/index.js";
import AboutUsPage from "./components/AboutUsPage/index.js";
import UnauthorizedInvalidPage from "./components/UnauthorizedInvalidPage/index.js";
const router = createHashRouter([{
  path: "/",
  element: /*#__PURE__*/React.createElement(RootPage, null),
  children: [{
    path: "/",
    element: /*#__PURE__*/React.createElement(RetrieveMoviePage, null)
  }, {
    path: "/create-movie",
    element: /*#__PURE__*/React.createElement(CreateMoviePage, null)
  }, {
    path: "/delete-movie",
    element: /*#__PURE__*/React.createElement(DeleteMoviePage, null)
  }, {
    path: "/update-movies",
    element: /*#__PURE__*/React.createElement(UpdateMoviesPage, null)
  }, {
    path: "/update-movies/:movieID",
    element: /*#__PURE__*/React.createElement(UpdateIndividualMoviePage, null)
  }, {
    path: "/pinned-movies",
    element: /*#__PURE__*/React.createElement(PinnedMoviesPage, null)
  }, {
    path: "/about-us",
    element: /*#__PURE__*/React.createElement(AboutUsPage, null)
  }],
  errorElement: /*#__PURE__*/React.createElement(UnauthorizedInvalidPage, null)
}]);
function App() {
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(RouterProvider, {
    router: router
  }));
}

// This setup we're using is just one way which we can set up our react app
// Another way to set up our react app is such that you will see another index.js file which has these 2 lines of code below (then we have to export default our App in App.jsx && have to import App into index.js)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));