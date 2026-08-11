import { PrismaClient } from "@prisma/client";

/* eslint-disable no-unused-vars */
declare global {
  var prisma: PrismaClient | undefined;
}
/* eslint-enable no-unused-vars */

export const db = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = db;
