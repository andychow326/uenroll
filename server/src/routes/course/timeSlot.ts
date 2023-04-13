import prisma from "../../prisma";
import { publicProcedure } from "../../procedure";

const timeSlot = publicProcedure.query(async () => {
  const timeSlots = await prisma.timeSlot.findMany();
  return timeSlots;
});

export default timeSlot;
