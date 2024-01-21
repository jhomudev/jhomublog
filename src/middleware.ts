import NextAuth from "next-auth"
import { authConfig } from "./app/client/libs/auth.config"

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'/* , '/', '/(api|trpc)(.*)' */]
}
