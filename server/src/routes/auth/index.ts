import trpc from "../../trpc";
import login from "./login";

const auth = trpc.router({
  login,
});

export default auth;
