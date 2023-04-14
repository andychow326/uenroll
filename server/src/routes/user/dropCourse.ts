import { z } from "zod";
import { authProcedure } from "../../procedure";
import { enrollmentQueue } from "../../queue";
import { EnrollmentJobType } from "../../types";

const inputSchema = z.array(z.string());

const dropCourse = authProcedure
  .input(inputSchema)
  .query(async ({ ctx, input }) => {
    await enrollmentQueue.add(ctx.user.id, {
      type: EnrollmentJobType.DROP,
      userID: ctx.user.id,
      courseIDList: input,
    });
  });

export default dropCourse;
