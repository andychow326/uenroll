import auth from "./routes/auth";
import healthz from "./routes/healthz";
import user from "./routes/user";
import trpc from "./trpc";

export const router = trpc.router({
  healthz,
  auth,
  user,
});

export type Router = typeof router;
