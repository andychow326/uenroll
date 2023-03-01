import { publicProcedure } from "../procedure";

const healthz = publicProcedure.query(() => "ok");

export default healthz;
