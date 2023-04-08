import prisma from "../../prisma";
import { adminProcedure } from "../../procedure";
import { inputSchema } from "./create";

const edit = adminProcedure.input(inputSchema).query(async ({ input }) => {
  const user = await prisma.user.update({
    where: {
      id: input.id,
    },
    data: input,
  });

  return user;
});

export default edit;
