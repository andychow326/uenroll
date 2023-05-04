import prisma from "../src/prisma";
import { redisClient, setupRedisClient } from "../src/redis";
import ResetDatabase from "./helpers/ResetDatabase";

beforeAll(() => setupRedisClient());
beforeEach(() => ResetDatabase());
afterAll(async () =>
  Promise.all([prisma.$disconnect(), redisClient.disconnect()])
);
