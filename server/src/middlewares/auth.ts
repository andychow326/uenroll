import { TRPCError } from "@trpc/server";
import trpc from "../trpc";

const auth = trpc.middleware(({ ctx, next }) => {
  if (ctx.user == null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx });
});

export default auth;
