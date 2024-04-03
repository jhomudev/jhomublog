import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, protectedRoutes  } from '@/routes'
import db from './prisma'
import { env } from './env'

const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        account: true
      }
    })

    return user
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    return null
  }
}

export const authConfig: NextAuthConfig = {
  providers: [ 
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        const user = await getUserById(token.sub)
        session.user.id = token.sub
        if (user?.username && user.account?.access_token) {
          session.user.username = user.username,
          session.sessionToken = user.account?.access_token
        }
      }
      return session
    },
    async jwt({ token }) {
      return token
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    authorized({ request: req, auth }) {
      const { nextUrl } = req
      const isLoggedIn = auth

      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
      const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
      const isAuthRoute = authRoutes.includes(nextUrl.pathname)

      if (isApiAuthRoute) return true
      
      if (isAuthRoute && isLoggedIn) {
        const callbackUrl = nextUrl.searchParams.get('callbackUrl')
        if(!!callbackUrl) return Response.redirect(new URL(callbackUrl))
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }

      if(!isLoggedIn && isProtectedRoute) return false

      return true
    },
  },
}
