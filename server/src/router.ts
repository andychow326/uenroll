import healthz from "./routes/healthz";
import auth from "./routes/auth";
import trpc from "./trpc";

export const router = trpc.router({
  healthz,
  auth,
});

export type Router = typeof router;
