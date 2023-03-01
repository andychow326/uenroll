import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = (opts: CreateExpressContextOptions) => ({});

export type Context = inferAsyncReturnType<typeof createContext>;
