import { AuthErrorUserNotFound } from "../../exceptions";
import prisma from "../../prisma";
import { authProcedure } from "../../procedure";

const profile = authProcedure.query(async ({ ctx }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: ctx.user.id,
    },
  });
  if (user == null) {
    throw AuthErrorUserNotFound;
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
    gender: user.gender,
    major: user.major,
    address: user.address,
  };
});

export default profile;
