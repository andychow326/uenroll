import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import ApiClientProvider from "../contexts/ApiClientProvider";
import UserProvider from "../contexts/UserProvider";
import routes from "../routes";
import Home from "./Home";
import Authentication from "./Authentication";
import MESSAGES from "../locale-data/en.json";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: routes.prefix,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.auth.path,
        children: [
          { index: true, element: <Navigate to={routes.auth.mode.path} /> },
          {
            path: routes.auth.mode.path,
            element: <Authentication />,
          },
        ],
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
