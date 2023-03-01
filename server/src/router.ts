import healthz from "./routes/healthz";
import trpc from "./trpc";

export const router = trpc.router({
  healthz,
});

export type Router = typeof router;
