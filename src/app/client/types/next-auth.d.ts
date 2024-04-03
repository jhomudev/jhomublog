import NextAuth, { DefaultSession } from "next-auth"

export type ExtendedUser = {
  username: string
  name: string
  lastname: string
  image?: string
} & DefaultSession["user"]

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    sessionToken: string,
    user: ExtendedUser
  }
}