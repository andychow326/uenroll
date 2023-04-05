import trpc from "../../trpc";
import list from "./list";
import profile from "./profile";
import validateSession from "./validateSession";

const user = trpc.router({
  profile,
  validateSession,
  list,
});

export default user;
