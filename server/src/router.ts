import auth from "./routes/auth";
import course from "./routes/course";
import healthz from "./routes/healthz";
import user from "./routes/user";
import trpc from "./trpc";

export const router = trpc.router({
  healthz,
  auth,
  user,
  course,
});

export type Router = typeof router;
