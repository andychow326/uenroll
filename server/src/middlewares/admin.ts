import { AuthErrorUnauthorized } from "../exceptions";
import trpc from "../trpc";

const admin = trpc.middleware(({ ctx, next }) => {
  if (!ctx.user?.isAdmin) {
    throw AuthErrorUnauthorized;
  }
  return next({ ctx });
});

export default admin;
