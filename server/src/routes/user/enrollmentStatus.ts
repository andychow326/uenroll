import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const enrolledStatus = authProcedure.query(async ({ ctx }) => {
  const userID = ctx.user.id;

  const enrollmentStatusItem = await prisma.enrollmentStatus.findMany({
    where: { userId: userID },
    include: {
      openedCourse: {
        include: {
          course: true,
        },
      },
    },
  });

  return enrollmentStatusItem.map((item) => ({
    id: item.id,
    status: item.status,
    subject: item.openedCourse.subject,
    number: item.openedCourse.number,
    title: item.openedCourse.course.title,
    requestType: item.requestType,
    message: item.message,
  }));
});

export default enrolledStatus;
