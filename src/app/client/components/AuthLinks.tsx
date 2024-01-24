'use client'
import MyTooltip from "@client/components/MyTooltip"
import ThemeToggle from "@client/components/ThemeToggle"
import UserDropdown from "@client/components/UserDropDown"
import { BellIcon, EnterIcon } from '@radix-ui/react-icons'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import PublishButton from "../features/write/components/PublishButton"

function AuthLinks() {
  const pathname = usePathname()
  const {status } = useSession()
  const [open, setOpen] = useState(false)

  const isWritePage = pathname === '/write'

  if(status==='loading') return

  return (
    <>
      {
        status === 'unauthenticated'
          ? <MyTooltip content="Sign in"><Link href={'/login'} className="hidden sm:block"><EnterIcon width={20} height={20} /></Link></MyTooltip>
          : (
            <>
              {isWritePage ? <PublishButton /> : <Link href={'/write'} className="hidden sm:block">Write</Link>}
              <Link href={'/notifications'}><BellIcon width={20} height={20} /></Link>
              <UserDropdown />
            </>
          )
      }
      <div className="w-[20px] h-[16px] flex sm:hidden flex-col justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <span className="w-full h-[2px] bg-bg_main_dark dark:bg-bg_main"></span>
        <span className="w-full h-[2px] bg-bg_main_dark dark:bg-bg_main"></span>
        <span className="w-full h-[2px] bg-bg_main_dark dark:bg-bg_main"></span>
      </div>
      {
        open && (
          <>
            <ul className="absolute z-30 top-[100px] left-0 h-[calc(100dvh_-_100px)] w-full flex sm:hidden items-center justify-center flex-col gap-10 text-2xl bg-bg_main dark:bg-bg_main_dark backdrop-blur-lg">
              <li><Link href={'/'}><ThemeToggle variant="images" /></Link></li>
              <li onClick={()=>setOpen(false)}><Link href={'/'}>Home</Link></li>
              <li onClick={()=>setOpen(false)}><Link href={'/blog'}>Blog</Link></li>
              {
                status === 'unauthenticated'
                  ? <li onClick={()=>setOpen(false)}><Link href={'/login'}>Login</Link></li>
                  : (
                    <>
                      <li onClick={()=>setOpen(false)}><Link href={'/write'}>Write</Link></li>
                      <li><button onClick={() => signOut()}>Logout</button></li>
                    </>
                  )
              }
            </ul>
          </>
        )
      }
    </>
  )
}
export default AuthLinks