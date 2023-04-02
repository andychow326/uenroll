const routes = {
  prefix: "",
  auth: {
    path: "/auth",
    mode: { path: "/auth/:mode" },
  },
  course: {
    path: "/course",
  },
  shoppingCart: {
    path: "/shopping-cart",
  },
  dropClasses: {
    path: "/drop-classes",
  },
  enrollmentStatus: {
    path: "/enrollment-status",
  },
  timeTable: {
    path: "/time-table",
  },
  manage: {
    path: "/manage",
    course: { path: "/manage/course" },
    user: { path: "/manage/user" },
  },
} as const;

export default routes;
