import trpc from "../../trpc";
import addShoppingCart from "./addShoppingCart";
import create from "./create";
import edit from "./edit";
import enrollCourse from "./enrollCourse";
import enrolledCourse from "./enrolledCourse";
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
});

export default user;
