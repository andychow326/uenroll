import { Context } from "../../src/context";
import { router } from "../../src/router";

function MockAPIRequest(context?: Context) {
  return router.createCaller(context ?? {});
}

export default MockAPIRequest;
