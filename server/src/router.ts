import healthz from "./routes/healthz";
import auth from "./routes/auth";
import trpc from "./trpc";
import user from "./routes/user";

export const router = trpc.router({
  healthz,
  auth,
  user,
});

export type Router = typeof router;
