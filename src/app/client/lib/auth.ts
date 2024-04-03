import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import db from "./prisma";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

export const { handlers: { GET, POST }, auth, signIn ,signOut } =  NextAuth({
  adapter: PrismaAdapter(db as PrismaClient),
  session: { strategy: 'jwt' },
  ...authConfig,
})