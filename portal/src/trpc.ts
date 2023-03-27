import { createTRPCReact } from "@trpc/react-query";
import { inferRouterError } from "@trpc/server";
import type { Router } from "server/src/router";

export type Error = inferRouterError<Router>;

const trpc = createTRPCReact<Router>();

export default trpc;
