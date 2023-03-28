const routes = {
  prefix: "",
  auth: {
    path: "/auth",
    mode: { path: "/auth/:mode" },
  },
} as const;

export default routes;
