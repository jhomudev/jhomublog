import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import db from "./prisma";

export const { handlers: { GET, POST }, auth, signIn ,signOut } =  NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})