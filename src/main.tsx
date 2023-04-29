import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";

import { Error } from "./pages/Error.tsx";
import { createBrowserRouter } from "react-router-dom";
import { SearchCity } from "./pages/SearchCity.tsx";
import { FrontPage } from "./pages/Frontpage.tsx";
import { CurrentWeather } from "./pages/CurrentWeather.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage></FrontPage>,
    errorElement: <Error></Error>,
  },
  {
    path: "/current-weather",
    element: <CurrentWeather></CurrentWeather>,
  },
  {
    path: "/search-city",
    element: <SearchCity></SearchCity>,
  },
  // {
  //   path: "/superheroes/:id",
  //   element: <SuperheroView></SuperheroView>,
  //   loader: superheroLoader,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
