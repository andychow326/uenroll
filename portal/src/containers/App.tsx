import React, { lazy, Suspense } from "react";
import { IntlProvider } from "react-intl";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiClientProvider from "../contexts/ApiClientProvider";
import UserProvider from "../contexts/UserProvider";
import MESSAGES from "../locale-data/en.json";
import routes from "../routes";

const Authentication = lazy(async () => import("./Authentication"));
const Home = lazy(async () => import("./Home"));
const Root = lazy(async () => import("./Root"));

const router = createBrowserRouter([
  {
    path: routes.prefix,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: routes.auth.path,
        children: [
          { index: true, element: <Navigate to={routes.auth.mode.path} /> },
          {
            path: routes.auth.mode.path,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Authentication />
              </Suspense>
            ),
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
