import trpc from "../../trpc";
import login from "./login";
import logout from "./logout";
import resetPassword from "./resetPassword";
import validateAccessToken from "./validateAccessToken";

const auth = trpc.router({
  login,
  logout,
  resetPassword,
  validateAccessToken,
});

export default auth;
