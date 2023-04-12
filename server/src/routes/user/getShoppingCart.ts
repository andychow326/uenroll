import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const getShoppingCart = authProcedure.query(async ({ ctx }) => {
  const userID = ctx.user.id;

  const courses = await prisma.getShoppingCart.findMany({
    where: { userId: userID },
    include: {
      openedCourse: {
        include: {
          course: true,
        },
      },
    },
  });

  return courses.map((course) => ({
    ...course.openedCourse,
  }));
});

export default getShoppingCart;
