import { TRPCError } from "@trpc/server";
import trpc from "../trpc";

const admin = trpc.middleware(({ ctx, next }) => {
  if (!ctx.user?.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx });
});

export default admin;
