/* eslint-disable no-console */
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createContext } from "./context";
import { router } from "./router";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan("combined"));

app.use(
  cors({
    origin: [process.env.ORIGIN ?? ""],
  })
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router,
    createContext,
  })
);

console.log("Server lisening on port 3000");
app.listen(3000);
