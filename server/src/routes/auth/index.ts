import trpc from "../../trpc";
import login from "./login";
import logout from "./logout";

const auth = trpc.router({
  login,
  logout,
});

export default auth;
