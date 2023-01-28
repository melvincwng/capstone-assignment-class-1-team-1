import { Provider } from "react-redux";
import store from "./redux/storage";
import RootPage from "./components/RootPage";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RetrieveMoviePage from "./components/RetrieveMoviePage";
import CreateMoviePage from "./components/CreateMoviePage";
import DeleteMoviePage from "./components/DeleteMoviePage";
import UpdateMoviesPage from "./components/UpdateMoviesPage";
import UpdateIndividualMoviePage from "./components/UpdateIndividualMoviePage";
import PinnedMoviesPage from "./components/PinnedMoviesPage";
import AboutUsPage from "./components/AboutUsPage";
import UnauthorizedInvalidPage from "./components/UnauthorizedInvalidPage";

const router = createHashRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <RetrieveMoviePage />,
      },
      {
        path: "/create-movie",
        element: <CreateMoviePage />,
      },
      {
        path: "/delete-movie",
        element: <DeleteMoviePage />,
      },
      {
        path: "/update-movies",
        element: <UpdateMoviesPage />,
      },
      {
        path: "/update-movies/:movieID",
        element: <UpdateIndividualMoviePage />,
      },
      {
        path: "/pinned-movies",
        element: <PinnedMoviesPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
    ],
    errorElement: <UnauthorizedInvalidPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

// This setup we're using is just one way which we can set up our react app
// Another way to set up our react app is such that you will see another index.js file which has these 2 lines of code below (then we have to export default our App in App.jsx && have to import App into index.js)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
