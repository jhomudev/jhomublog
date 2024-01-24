import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, protectedRoutes  } from '@/routes'

export const authConfig: NextAuthConfig = {
  providers: [ 
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session}) {
      return session
    },
    async jwt({ token}) {
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
