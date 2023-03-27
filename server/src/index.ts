/* eslint-disable no-console */
import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createContext } from "./context";
import { router } from "./router";
import { setupRedisClient } from "./redis";

dotenv.config();

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

setupRedisClient();

console.log("Server lisening on port 3000");
app.listen(3000);
