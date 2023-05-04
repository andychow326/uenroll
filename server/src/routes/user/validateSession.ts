import { AuthErrorUnauthorized } from "../../exceptions";
import { publicProcedure } from "../../procedure";

const validateSession = publicProcedure.query(({ ctx }) => {
  if (ctx.sessionID == null) {
    throw AuthErrorUnauthorized;
  }

  return true;
});

export default validateSession;
