import trpc from "../../trpc";
import addShoppingCart from "./addShoppingCart";
import create from "./create";
import deleteShoppingCart from "./deleteShoppingCart";
import dropCourse from "./dropCourse";
import edit from "./edit";
import enrollCourse from "./enrollCourse";
import enrolledCourse from "./enrolledCourse";
import enrollmentStatus from "./enrollmentStatus";
import getShoppingCart from "./getShoppingCart";
import list from "./list";
import profile from "./profile";
import sendInvitation from "./sendInvitation";
import validateSession from "./validateSession";

const user = trpc.router({
  profile,
  create,
  edit,
  list,
  validateSession,
  sendInvitation,
  enrolledCourse,
  addShoppingCart,
  getShoppingCart,
  enrollCourse,
  deleteShoppingCart,
  dropCourse,
  enrollmentStatus,
});

export default user;
