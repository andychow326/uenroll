import { z } from "zod";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const inputSchema = z.array(z.string());

const deleteShoppingCart = authProcedure
  .input(inputSchema)
  .query(async ({ ctx, input }) => {
    const userID = ctx.user.id;
    await prisma.shoppingCart.deleteMany({
      where: {
        OR: input.map((courseID) => ({ courseId: courseID, userId: userID })),
      },
    });
  });

export default deleteShoppingCart;
