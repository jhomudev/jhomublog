import WritePostProvider from '@/app/client/features/write/providers/WritePostProvider'
import type { Metadata } from 'next'
import { Quicksand, Titillium_Web } from 'next/font/google'
import Footer from './client/components/Footer'
import NavBar from './client/components/NavBar'
import { Toaster } from './client/components/ui/toaster'
import SearchProvider from './client/features/search/providers/SearchProvider'
import AuthProvider from './client/providers/AuthProvider'
import NextUIProviderTheme from './client/providers/NextUIProviderTheme'
import './globals.css'
import TopLoader from './client/components/TopLoader'
import { env } from './client/lib/env'


const q = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const ti = Titillium_Web({
  subsets: ['latin'],
  weight: ["300", "400", "600", "700", "200", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "Jhomublog - Share your thoughts and ideas with the world",
    template: '%s | jhomublog'
  },
  description: 'Jhomublog. A blog for all people who are interested in diverse topics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${ti.className} scroll-smooth`}>
        <AuthProvider>
          <NextUIProviderTheme>
            <SearchProvider>
              <WritePostProvider>
              <TopLoader />
                <div className="container-all bg-bg_main text-text_color dark:bg-bg_main_dark dark:text-text_color_dark min-h-screen">
                  <div className="container px-6 md:px-10">
                    <NavBar />
                    <div className="min-h-[100dvh]">
                      {children}
                    </div>
                    <Footer />
                  </div>
                </div>
              </WritePostProvider>
            </SearchProvider>
          </NextUIProviderTheme>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
