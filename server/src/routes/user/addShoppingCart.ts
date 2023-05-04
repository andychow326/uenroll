import { z } from "zod";
import { CourseErrorCourseAlreadyExists } from "../../exceptions";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const inputSchema = z.string().trim().nonempty();

const addShoppingCart = authProcedure
  .input(inputSchema)
  .query(async ({ ctx, input }) => {
    const userID = ctx.user.id;

    const data = await prisma.shoppingCart.findUnique({
      where: {
        userId_courseId: {
          userId: userID,
          courseId: input,
        },
      },
    });

    if (data != null) {
      throw CourseErrorCourseAlreadyExists;
    }

    await prisma.shoppingCart.createMany({
      data: {
        userId: userID,
        courseId: input,
      },
    });

    return true;
  });

export default addShoppingCart;
