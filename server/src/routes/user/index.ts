import trpc from "../../trpc";
import validateSession from "./validateSession";

const user = trpc.router({
  validateSession,
});

export default user;
