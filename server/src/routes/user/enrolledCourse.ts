import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const enrolledCourse = authProcedure.query(async ({ ctx }) => {
  const userID = ctx.user.id;

  const courses = await prisma.enrolledCourse.findMany({
    where: { userId: userID },
    include: {
      openedCourse: {
        include: {
          course: true,
          _count: { select: { EnrolledCourse: true } },
        },
      },
    },
  });

  return courses.map((course) => ({
    ...course.openedCourse,
  }));
});

export default enrolledCourse;
