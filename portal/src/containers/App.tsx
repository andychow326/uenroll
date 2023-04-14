import React, { lazy, Suspense } from "react";
import { IntlProvider } from "react-intl";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiClientProvider from "../contexts/ApiClientProvider";
import TimeSlotProvider from "../contexts/TimeSlotProvider";
import UserProvider from "../contexts/UserProvider";
import MESSAGES from "../locale-data/en.json";
import routes from "../routes";

const Authentication = lazy(async () => import("./Authentication"));
const Home = lazy(async () => import("./Home"));
const Root = lazy(async () => import("./Root"));
const CourseManagement = lazy(async () => import("./CourseManagement"));
const UserManagement = lazy(async () => import("./UserManagement"));
const CourseSearch = lazy(async () => import("./CourseSearch"));
const ShoppingCart = lazy(async () => import("./ShoppingCart"));
const DropClasses = lazy(async () => import("./DropClasses"));
const TimeTable = lazy(async () => import("./TimeTable"));
const EnrollmentStatus = lazy(async () => import("./EnrollmentStatus"));

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
        path: routes.manage.path,
        children: [
          {
            path: routes.manage.course.path,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CourseManagement />
              </Suspense>
            ),
          },
          {
            path: routes.manage.user.path,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <UserManagement />
              </Suspense>
            ),
          },
        ],
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
      {
        path: routes.course.path,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CourseSearch />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: routes.shoppingCart.path,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ShoppingCart />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: routes.dropClasses.path,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <DropClasses />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: routes.timeTable.path,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <TimeTable />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: routes.enrollmentStatus.path,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <EnrollmentStatus />
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
        <TimeSlotProvider>
          <RouterProvider router={router} />
        </TimeSlotProvider>
      </ApiClientProvider>
    </UserProvider>
  </IntlProvider>
);

export default App;
