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
    ...item.openedCourse,
  }));
});

export default enrolledStatus;
