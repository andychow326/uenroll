import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../procedure";

const validateSession = publicProcedure.query(({ ctx }) => {
  if (ctx.sessionID == null) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return true;
});

export default validateSession;
