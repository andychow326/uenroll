/* eslint-disable no-console */
import trpc from "../trpc";

const logger = trpc.middleware(async ({ type, rawInput, next }) => {
  const result = await next();
  console.log("\ntype:", type);
  console.log("input:", rawInput);
  console.log("result:", result);
  return result;
});

export default logger;
