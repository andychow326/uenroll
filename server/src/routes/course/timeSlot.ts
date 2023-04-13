import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const timeSlot = authProcedure.query(async () => {
  const timeSlots = await prisma.timeSlot.findMany();
  return timeSlots;
});

export default timeSlot;
