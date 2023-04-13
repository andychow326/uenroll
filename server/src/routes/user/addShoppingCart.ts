import { TRPCError } from "@trpc/server";
import { z } from "zod";
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
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "error.server.shopping-cart.already_exists",
      });
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
