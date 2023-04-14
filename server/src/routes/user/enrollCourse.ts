import { z } from "zod";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";
import { enrollmentQueue } from "../../queue";
import { EnrollmentJobType } from "../../types";

const inputSchema = z.array(z.string());

const enrollCourse = authProcedure
  .input(inputSchema)
  .query(async ({ ctx, input }) => {
    await prisma.shoppingCart.deleteMany({
      where: {
        OR: input.map((courseID) => ({
          courseId: courseID,
          userId: ctx.user.id,
        })),
      },
    });

    await enrollmentQueue.add(ctx.user.id, {
      type: EnrollmentJobType.ENROLL,
      userID: ctx.user.id,
      courseIDList: input,
    });
  });

export default enrollCourse;
