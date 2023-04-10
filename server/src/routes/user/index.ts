import trpc from "../../trpc";
import create from "./create";
import edit from "./edit";
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
});

export default user;
