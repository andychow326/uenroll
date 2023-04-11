import trpc from "../../trpc";
import forgotPassword from "./forgotPassword";
import login from "./login";
import logout from "./logout";
import resetPassword from "./resetPassword";
import validateAccessToken from "./validateAccessToken";

const auth = trpc.router({
  login,
  logout,
  resetPassword,
  validateAccessToken,
  forgotPassword,
});

export default auth;
