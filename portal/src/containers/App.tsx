import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";

const router = createBrowserRouter([
  {
    path: routes.prefix,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.logout,
        element: <Logout />,
      },
    ],
  },
]);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
