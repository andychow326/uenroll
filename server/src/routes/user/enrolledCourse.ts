import prisma from "../../prisma";
import { authProcedure } from "../../procedure";
import { finalizeOpenedCourseList } from "../course/list";

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
    ...finalizeOpenedCourseList([course.openedCourse])[0].openedCourse[0],
  }));
});

export default enrolledCourse;
