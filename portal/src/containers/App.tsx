import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IntlProvider } from "react-intl";
import ApiClientProvider from "../contexts/ApiClientProvider";
import UserProvider from "../contexts/UserProvider";
import routes from "../routes";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import MESSAGES from "../locale-data/en.json";

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

const App: React.FC = () => (
  <IntlProvider messages={MESSAGES} locale="en">
    <UserProvider>
      <ApiClientProvider>
        <RouterProvider router={router} />
      </ApiClientProvider>
    </UserProvider>
  </IntlProvider>
);

export default App;
