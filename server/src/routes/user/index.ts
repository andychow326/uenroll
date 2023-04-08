import trpc from "../../trpc";
import create from "./create";
import edit from "./edit";
import list from "./list";
import profile from "./profile";
import validateSession from "./validateSession";

const user = trpc.router({
  profile,
  create,
  edit,
  list,
  validateSession,
});

export default user;
