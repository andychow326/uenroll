import trpc from "../../trpc";
import profile from "./profile";
import validateSession from "./validateSession";

const user = trpc.router({
  profile,
  validateSession,
});

export default user;
