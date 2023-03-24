import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Main from "./layouts/Main";
// import Movies from "./pages/Movies";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import "./custom.css";
import Showcase from "./layouts/Showcase";
// import Movie from "./pages/Movie";
import ServicesMovies from "./pages/Movies";

// client pages
import Home from "./pages/client/Home";
import Movie from "./pages/client/Movie";
import Movies from "./pages/client/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "movies/",
    element: <Movies />,
  },
  {
    path: "movie/:movieId",
    element: <Movie />,
  },
  {
    path: "services/",
    element: <Main />,
    children: [
      {
        path: "movies/",
        element: <ServicesMovies />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <AnimatePresence>
    <RouterProvider router={router} />
  </AnimatePresence>
);
